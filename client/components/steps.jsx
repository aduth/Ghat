var React = require( 'react' ),
    observe = require( '../mixins/observe-store' ),
    helpers = require( '../../shared/helpers/' ),
    stores = require( '../stores/' ),
    Connection = require( './connection' ),
    Configure = require( './configure' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [ observe( 'tokens', 'contacts', 'repositories' ) ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        contacts: React.PropTypes.instanceOf( stores.Contact ).isRequired,
        repositories: React.PropTypes.instanceOf( stores.Repository ).isRequired,
        hooks: React.PropTypes.instanceOf( stores.Hook ).isRequired,
        integrations: React.PropTypes.instanceOf( stores.Integration ).isRequired
    },

    render: function() {
        return (
            <ol className="steps">
                <Connection
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account." />
                <Connection
                    name="chat"
                    icon="comments"
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <Configure
                    tokens={ this.props.tokens }
                    contacts={ this.props.contacts }
                    repositories={ this.props.repositories }
                    hooks={ this.props.hooks }
                    integrations={ this.props.integrations }
                    disabled={ ! this.props.tokens.isConnected() } />
            </ol>
        );
    }
});
