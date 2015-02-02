var React = require( 'react/addons' ),
    find = require( 'lodash/collection/find' ),
    observe = require( '../mixins/observe-store' ),
    monitor = require( '../mixins/event-monitor' ),
    integrations = require( '../../shared/integrations/' ),
    stores = require( '../stores/' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'Connection',

    mixins: [
        observe( 'tokens', 'profiles' ),
        monitor( 'tokens', 'verify', 'setProvider' )
    ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        providers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired
    },

    getInitialState: function() {
        return {};
    },

    getDefaultProps: function() {
        return { showSelect: true };
    },

    setProvider: function() {
        this.setState({ provider: this.getConnectedProvider() });
    },

    authenticate: function( provider ) {
        this.setState({ provider: provider });
        window.open( '/authorize/' + provider );
    },

    disconnect: function() {
        if ( this.state.provider ) {
            this.props.tokens.remove( this.state.provider );
            this.props.profiles.remove( this.state.provider );
        }
    },

    isConnected: function() {
        return this.state.provider && !! this.props.tokens.get( this.state.provider );
    },

    getConnectedProvider: function() {
        return find( this.props.providers, function( provider ) {
            return !! this.props.tokens.get( provider );
        }.bind( this ) );
    },

    getAvatarImage: function() {
        var profile;
        if ( this.state.provider ) {
            profile = this.props.profiles.get( this.state.provider, this.props.tokens.get( this.state.provider ) );
            if ( profile ) {
                return (
                    <button className="connection__disconnect" onClick={ this.disconnect }>
                        <span className="fa fa-remove connection__disconnect-icon"></span>
                        <span className="visually-hidden">Disconnect</span>
                        <img width="100" height="100" src={ profile.avatar } alt="User avatar" className="connection__user-avatar" />
                    </button>
                );
            }
        }
    },

    getProviderSelect: function() {
        var options = this.props.providers.map(function( provider ) {
            return { value: provider, label: integrations[ provider ].name };
        });

        return <Select options={ options } value={ this.state.provider } onChange={ this.onProviderChange } includeDefault={ false } />;
    },

    getIcon: function() {
        if ( this.props.icon ) {
            return <span className={ 'connection__icon fa fa-' + this.props.icon } />;
        }
    },

    onProviderChange: function( provider ) {
        this.setState({ provider: provider });
    },

    render: function() {
        var classes = [
            'connection',
            this.props.name,
            React.addons.classSet({
                connected: this.isConnected()
            })
        ].join( ' ' );

        return (
            <li className={ classes }>
                <div className="connection__content">
                    <header className="connection__heading">
                        <h1 className="connection__name">{ 'Connect ' + this.props.name }</h1>
                        { this.getIcon() }
                    </header>
                    <p className="connection__description">{ this.props.description }</p>
                    <div className="connection__actions">
                        { this.getProviderSelect() }
                        <button onClick={ this.authenticate.bind( null, this.state.provider ) } className="button" disabled={ ! this.state.provider }>Authenticate</button>
                    </div>
                    <aside className="connection__authorized-account">
                        { this.getAvatarImage() }
                    </aside>
                </div>
            </li>
        );
    }
});
