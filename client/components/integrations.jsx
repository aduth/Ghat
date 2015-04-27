var React = require( 'react' ),
    async = require( 'async' ),
    stores = require( '../stores/' ),
    mixins = require( '../mixins/' ),
    integrations = require( '../../shared/integrations/' );

module.exports = React.createClass({
    displayName: 'Integrations',

    mixins: [
        mixins.observeStore([ 'tokens', 'integrations' ])
    ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired,
        notices: React.PropTypes.instanceOf( stores.Notice ).isRequired
    },

    deleteIntegration: function( integration ) {
        var chatProvider = this.props.tokens.getConnectedChatProvider(),
            chatToken = this.props.tokens.get( chatProvider ),
            githubToken = this.props.tokens.get( 'github' );

        async.parallel([
            this.props.integrations.removeById.bind( this.props.integrations, integration._id, chatProvider, chatToken, githubToken ),
            this.props.hooks.remove.bind( this.props.hooks, githubToken, integration )
        ], function( err ) {
            if ( err ) {
                this.props.notices.add( 'An error occurred while trying to remove an integration', 'error' );
            } else {
                this.props.notices.add( 'Successfully removed an integration' );
            }
        }.bind( this ) );
    },

    getEventListElements: function( integration ) {
        var events = integrations.github.getAvailableEvents();

        return integration.github.events.map(function( event ) {
            return <li key={ event }>{ events[ event ] }</li>;
        });
    },

    getIntegrationsElement: function() {
        var chatProvider = this.props.tokens.getConnectedChatProvider(),
            chatToken = this.props.tokens.get( chatProvider ),
            githubToken = this.props.tokens.get( 'github' ),
            integrations = this.props.integrations.get( chatProvider, chatToken, githubToken );

        if ( ! integrations.length ) {
            return (
                <tr><td colSpan="5" className="integrations__no-results">You haven't configured any integrations yet!</td></tr>
            );
        }

        return integrations.map(function( integration ) {
            return (
                <tr key={ integration._id }>
                    <td valign="top">{ integration.github.repository }</td>
                    <td>
                        <ul className="integrations__events">
                            { this.getEventListElements( integration ) }
                        </ul>
                    </td>
                    <td>
                        <a href={ '/configure/' + integration._id } className="icon-button is-green">
                            <span className="visually-hidden">Edit</span>
                            <span className="fa fa-pencil" />
                        </a>
                    </td>
                    <td>
                        <button type="button" className="icon-button" onClick={ this.deleteIntegration.bind( null, integration ) }>
                            <span className="visually-hidden">Delete</span>
                            <span className="fa fa-remove" />
                        </button>
                    </td>
                </tr>
            );
        }, this );
    },

    render: function() {
        return (
            <div className="integrations">
                <table className="integrations__current">
                    <thead>
                        <tr>
                            <th width="45%">Repository</th>
                            <th width="45%">Events</th>
                            <th width="5%">
                                <span className="visually-hidden">Edit</span>
                            </th>
                            <th width="5%">
                                <span className="visually-hidden">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getIntegrationsElement() }
                    </tbody>
                </table>
                <a href="/configure" className="button integrations__add-new">Add New Integration</a>
            </div>
        );
    }
});
