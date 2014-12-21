var React = require( 'react' ),
    observe = require( '../mixins/observe-store' );

module.exports = React.createClass({
    displayName: 'Steps',

    mixins: [ observe( 'tokens' ) ],

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