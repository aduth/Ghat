var React = require( 'react' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' ),
    helpers = require( '../../shared/helpers/' ),
    Step = require( './step' );

module.exports = React.createClass({
    displayName: 'Steps',

    propTypes: {
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        avatars: React.PropTypes.instanceOf( AvatarStore ).isRequired
    },

    render: function() {
        return (
            <ol className="steps">
                <Step name="GitHub" providers={ [ 'github' ] } tokens={ this.props.tokens } avatars={ this.props.avatars } />
                <Step name="chat" icon="comments" providers={ helpers.integrations.getChatIntegrations() } tokens={ this.props.tokens } avatars={ this.props.avatars } />
            </ol>
        );
    }
});
