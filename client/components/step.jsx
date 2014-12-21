var React = require( 'react' ),
    some = require( 'lodash-node/modern/collections/some' ),
    TokenStore = require( '../stores/token' );

module.exports = React.createClass({
    displayName: 'Step',

    getInitialState: function() {
        return { provider: null };
    },

    propTypes: {
        name: React.PropTypes.string.isRequired,
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        providers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired
    },

    authenticate: function( provider ) {
        this.setState({ provider: provider });
        window.open( '/authorize/' + provider );
    },

    isConnected: function() {
        if ( this.state.provider ) {
            return !! this.props.tokens.get( this.state.provider );
        }

        return some( this.props.providers, function( provider ) {
            return !! this.props.tokens.get( provider );
        }.bind( this ) );
    },

    getAuthenticationButton: function() {
        var provider = this.props.providers[0];

        return ( <button onClick={ this.authenticate.bind( null, provider ) }>Authenticate</button> );
    },

    render: function() {
        return (
            <div className={ 'step ' + this.props.name }>
                { this.getAuthenticationButton() }
                { this.props.tokens.get( this.state.provider ) }
            </div>
        );
    }
});