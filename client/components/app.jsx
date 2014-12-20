var React = require( 'react' );

module.exports = React.createClass({
    displayName: 'App',

    getInitialState: function() {
        return { accessToken: null };
    },

    authenticate: function() {
        window.open( '/authorize/github' );
        window.addEventListener( 'message', this.verify, false );
    },

    verify: function( event ) {
        if ( event.origin === window.location.protocol + '//' + window.location.host ) {
            var data = JSON.parse( event.data );
            this.setState({ accessToken: data.accessToken });
        }

        window.removeEventListener( 'message', this.verify );
    },

    render: function() {
        return (
            <div>
                <button onClick={ this.authenticate }>Authenticate</button>
                { this.state.accessToken }
            </div>
        );
    }
});