var React = require( 'react' ),
    observe = require( '../mixins/observe-store' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' ),
    helpers = require( '../../shared/helpers/' ),
    Prerequisite = require( './prerequisite' ),
    Configure = require( './configure' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [ observe( 'tokens' ) ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        avatars: React.PropTypes.instanceOf( AvatarStore ).isRequired
    },

    render: function() {
        return (
            <ol className="steps">
                <Prerequisite
                    name="github"
                    icon="github"
                    providers={ [ 'github' ] }
                    tokens={ this.props.tokens }
                    avatars={ this.props.avatars }
                    title="Connect to GitHub"
                    description="To create the webhooks necessary to relay events to your chat client, you must authorize Ghat to access your GitHub account." />
                <Prerequisite
                    name="chat"
                    icon="comments"
                    providers={ helpers.integrations.getChatIntegrations() }
                    tokens={ this.props.tokens }
                    avatars={ this.props.avatars }
                    title="Connect to Chat"
                    description="To allow Ghat to send messages to your chat client, you must authorize access to your account." />
                <Configure disabled={ ! this.props.tokens.isConnected() } />
            </ol>
        );
    }
});
