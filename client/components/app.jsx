var React = require( 'react' ),
    Header = require( './header' ),
    observe = require( '../mixins/observe-store' );

module.exports = React.createClass({
    displayName: 'App',

    mixins: [ observe( 'tokens' ) ],

    authenticate: function() {
        window.open( '/authorize/github' );
    },

    render: function() {
        return (
            <div className="app-container">
                <Header />
                <button onClick={ this.authenticate }>Authenticate</button>
                { this.props.tokens.get( 'github' ) }
            </div>
        );
    }
});