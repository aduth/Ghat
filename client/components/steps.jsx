var React = require( 'react' ),
    TokenStore = require( '../stores/token' ),
    Step = require( './step' );

module.exports = React.createClass({
    displayName: 'Steps',

    propTypes: {
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired
    },

    render: function() {
        return (
            <div className="steps">
                <Step name="github" providers={ [ 'github' ] } tokens={ this.props.tokens } />
                <Step name="chat" providers={ [ 'slack' ] } tokens={ this.props.tokens } />
            </div>
        );
    }
});