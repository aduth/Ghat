var React = require( 'react/addons' ),
    stores = require( '../stores/' ),
    mixins = require( '../mixins/' );

module.exports = React.createClass({
    displayName: 'Integrations',

    mixins: [
        mixins.observeStore([ 'tokens', 'integrations' ])
    ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    deleteIntegration: function( integration ) {
        var chatProvider = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatProvider );

        this.props.integrations.removeById( integration._id, chatProvider, chatToken );
    },

    getIntegrationsElement: function() {
        var chatProvider = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatProvider ),
            integrations = this.props.integrations.get( chatProvider, chatToken );

        if ( ! integrations.length ) {
            return (
                <tr><td colSpan="5" className="integrations__no-results">You haven't configured any integrations yet!</td></tr>
            );
        }

        return integrations.map(function( integration ) {
            return (
                <tr key={ integration._id }>
                    <td>{ integration.github.repository }</td>
                    <td>{ integration.github.events.join( ', ' ) }</td>
                    <td><span className="integrations__status is-ok fa fa-check" /></td>
                    <td>
                        <a href={ '/configure/' + integration._id } className="icon-button">
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
                            <th width="35%">Repository</th>
                            <th width="50%">Events</th>
                            <th width="5%">
                                <span className="visually-hidden">Status</span>
                            </th>
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
