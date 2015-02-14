var React = require( 'react' ),
    mixins = require( '../mixins/' ),
    helpers = require( '../../shared/helpers/' ),
    stores = require( '../stores/' ),
    Connection = require( './connection' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [
        mixins.observeStore([ 'tokens', 'contacts', 'repositories' ])
    ],

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
            <div className="steps">
                <Connection
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account. GitHub tokens are never saved to Ghat's servers." />
                <Connection
                    name="chat"
                    icon="comments"
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    profiles={ this.props.profiles }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <div className={ 'steps__tabs ' + ( this.props.tokens.isConnected() ? '' : 'disabled' ) }>
                    <div id="content" />
                    <aside className="steps__tabs-disabled-content">
                        You must complete the authorization steps above before configuring integrations.
                    </aside>
                </div>
            </div>
        );
    }
});
