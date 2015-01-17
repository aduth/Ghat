var React = require( 'react' ),
    helpers = require( '../../shared/helpers/' ),
    Connection = require( './connection' ),
    Configure = require( './configure' );

module.exports = React.createClass({
    displayName: 'Steps',

    propTypes: {
        stores: React.PropTypes.object
    },

    render: function() {
        return (
            <ol className="steps">
                <Connection
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.stores.token }
                    avatars={ this.props.stores.avatar }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account." />
                <Connection
                    name="chat"
                    icon="comments"
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.stores.token }
                    avatars={ this.props.stores.avatar }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <Configure
                    tokens={ this.props.stores.token }
                    contacts={ this.props.stores.contact }
                    disabled={ ! this.props.stores.token.isConnected() } />
            </ol>
        );
    }
});
