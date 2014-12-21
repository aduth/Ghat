var React = require( 'react' ),
    TokenStore = require( '../stores/token' ),
    observe = require( '../mixins/observe-store' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [ observe( 'tokens' ) ],

    propTypes: {
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired
    },

    authenticate: function() {
        window.open( '/authorize/github' );
    },

    render: function() {
        return (
            <div className="steps">
                <button onClick={ this.authenticate }>Authenticate</button>
                { this.props.tokens.get( 'github' ) }
            </div>
        );
    }
});