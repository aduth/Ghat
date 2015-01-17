var React = require( 'react' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' ),
    helpers = require( '../../shared/helpers/' ),
    Prerequisite = require( './prerequisite' );

module.exports = React.createClass({
    displayName: 'Steps',

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
            </ol>
        );
    }
});
