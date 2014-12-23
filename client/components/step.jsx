var React = require( 'react' ),
    some = require( 'lodash-node/modern/collections/some' ),
    observe = require( '../mixins/observe-store' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' );

module.exports = React.createClass({
    displayName: 'Step',

    mixins: [ observe( 'tokens', 'avatars' ) ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        avatars: React.PropTypes.instanceOf( AvatarStore ).isRequired,
        providers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
        icon: React.PropTypes.string
    },

    getInitialState: function() {
        return { provider: null };
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

        return ( <button onClick={ this.authenticate.bind( null, provider ) } className="btn btn-primary">Authenticate</button> );
    },

    getAvatarImage: function() {
        var avatar;
        if ( this.state.provider ) {
            avatar = this.props.avatars.get( this.state.provider, this.props.tokens.get( this.state.provider ) );
            if ( avatar ) {
                return ( <img width="30" height="30" src={ avatar } className="user-avatar" /> );
            }
        }
    },

    render: function() {
        return (
            <li className={ 'step ' + this.props.name.toLowerCase() }>
                <header className="step-heading">
                    <span className={ 'step-icon fa fa-' + ( this.props.icon || this.props.name.toLowerCase() ) } />
                </header>
                <div className="step-overview">
                    <h2 className="step-description">Connect your { this.props.name } account</h2>
                    { this.getAuthenticationButton() }
                    { this.getAvatarImage() }
                    { this.props.tokens.get( this.state.provider ) }
                </div>
            </li>
        );
    }
});