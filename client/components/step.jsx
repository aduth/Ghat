var React = require( 'react/addons' ),
    some = require( 'lodash-node/modern/collections/some' ),
    observe = require( '../mixins/observe-store' ),
    TokenStore = require( '../stores/token' ),
    AvatarStore = require( '../stores/avatar' );

module.exports = React.createClass({
    displayName: 'Step',

    mixins: [ observe( 'tokens', 'avatars' ) ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string,
        tokens: React.PropTypes.instanceOf( TokenStore ).isRequired,
        avatars: React.PropTypes.instanceOf( AvatarStore ).isRequired,
        providers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired
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

        return ( <button onClick={ this.authenticate.bind( null, provider ) } className="button">Authenticate</button> );
    },

    getAvatarImage: function() {
        var avatar;
        if ( this.state.provider ) {
            avatar = this.props.avatars.get( this.state.provider, this.props.tokens.get( this.state.provider ) );
            if ( avatar ) {
                return ( <img width="100" height="100" src={ avatar } className="step__user-avatar" /> );
            }
        }
    },

    getIcon: function() {
        if ( this.props.icon ) {
            return <span className={ 'step__icon fa fa-' + this.props.icon } />;
        }
    },

    render: function() {
        var classes = React.addons.classSet({
            step: true,
            connected: !! this.props.tokens.get( this.state.provider )
        });

        return (
            <li className={ classes }>
                <div className="step__content">
                    <header className="step__heading">
                        <h1 className="step__name">{ 'Connect ' + this.props.name }</h1>
                        { this.getIcon() }
                    </header>
                    <p className="step__description">{ this.props.description }</p>
                    { this.getAuthenticationButton() }
                    <aside className="step__authorized-account">
                        { this.getAvatarImage() }
                    </aside>
                </div>
            </li>
        );
    }
});
