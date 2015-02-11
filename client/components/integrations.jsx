var React = require( 'react/addons' ),
    stores = require( '../stores/' ),
    monitor = require( '../mixins/event-monitor' );

module.exports = React.createClass({
    displayName: 'Integrations',

    mixins: [ monitor( 'integrations' ) ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    getIntegrationsElement: function() {
        var chatProvider = this.props.tokens.getConnectedChatToken(),
            chatToken = this.props.tokens.get( chatProvider );

        return this.props.integrations.get( chatProvider, chatToken ).map(function( integration ) {
            return (
                <tr>
                    <td>{ integration.github.repository }</td>
                    <td>{ integration.github.events.join( ', ' ) }</td>
                    <td><span className="status is-ok fa fa-check" /></td>
                    <td>
                        <a href={ '/configure/' + integration._id } className="icon-button">
                            <span className="visually-hidden">Edit</span>
                            <span className="fa fa-pencil" />
                        </a>
                    </td>
                    <td>
                        <button type="button" className="icon-button">
                            <span className="visually-hidden">Delete</span>
                            <span className="fa fa-remove" />
                        </button>
                    </td>
                </tr>
            );
        });
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
            </div>
        );
    }
});
