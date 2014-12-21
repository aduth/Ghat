var React = require( 'react' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' ),
    Step = require( './step' );

module.exports = React.createClass({
    displayName: 'Steps',

    propTypes: {
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        avatars: React.PropTypes.instanceOf( AvatarStore ).isRequired
    },

    render: function() {
        return (
            <div className="steps">
                <Step name="github" providers={ [ 'github' ] } tokens={ this.props.tokens } avatars={ this.props.avatars } />
                <Step name="chat" providers={ [ 'slack' ] } tokens={ this.props.tokens } avatars={ this.props.avatars } />
            </div>
        );
    }
});