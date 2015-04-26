var React = require( 'react/addons' ),
    find = require( 'lodash/collection/find' ),
    ConnectionAvatar = require( './connection-avatar' ),
    mixins = require( '../mixins/' ),
    integrations = require( '../../shared/integrations/' ),
    stores = require( '../stores/' ),
    Select = require( './select' );

module.exports = React.createClass({
    displayName: 'Connection',

    mixins: [
        mixins.observeStore([ 'tokens' ]),
        mixins.eventMonitor( 'tokens', 'verify', 'setProvider' )
    ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string,
        connected: React.PropTypes.bool,
        manual: React.PropTypes.bool,
        onManualEntryChange: React.PropTypes.func,
        providers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
        tokens: React.PropTypes.instanceOf( stores.Token ).isRequired,
        profiles: React.PropTypes.instanceOf( stores.Profile ).isRequired,
        title: React.PropTypes.string,
        description: React.PropTypes.string
    },

    getInitialState: function() {
        return {};
    },

    getDefaultProps: function() {
        return {
            connected: false,
            manual: false
        };
    },

    setProvider: function() {
        this.setState({ provider: this.getConnectedProvider() });
    },

    authorize: function() {
        var provider = this.getSelectedProvider();

        this.setState({ provider: provider });

        window.open( '/api/authorize/' + provider );
    },

    disconnect: function() {
        if ( this.props.manual ) {
            this.props.onManualEntryChange( false );
        } else if ( this.props.connected ) {
            this.props.tokens.remove( this.state.provider );
            this.props.profiles.remove( this.state.provider );
        }
    },

    getConnectedProvider: function() {
        return find( this.props.providers, function( provider ) {
            return !! this.props.tokens.get( provider );
        }.bind( this ) );
    },

    getSelectedProvider: function() {
        return this.props.providers.length > 1 ? this.state.provider : this.props.providers[0];
    },

    getIconElement: function() {
        if ( this.props.icon ) {
            return <span className={ 'connection__icon fa fa-' + this.props.icon } />;
        }
    },

    getProviderSelectElement: function() {
        var options = this.props.providers.map(function( provider ) {
            return { value: provider, label: integrations[ provider ].name };
        });

        return <Select options={ options } value={ this.getSelectedProvider() } onChange={ this.onProviderChange } placeholder={ 'Choose a service' } />;
    },

    getManualEntryButtonElement: function() {
        if ( this.props.onManualEntryChange ) {
            return (
                <div className="connection__manual-entry">
                    <span className="connection__manual-entry-divider">or</span>
                    <button type="button" className="button" onClick={ this.props.onManualEntryChange.bind( null, true ) }>Manual Entry</button>
                </div>
            );
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
                connected: this.props.connected
            })
        ].join( ' ' );

        return (
            <div className={ classes }>
                <div className="connection__content">
                    <header className="connection__heading">
                        <h1 className="connection__name">{ 'Connect ' + this.props.name }</h1>
                        { this.getIconElement() }
                    </header>
                    <p className="connection__description">{ this.props.description }</p>
                    <div className="connection__actions">
                        { this.getProviderSelectElement() }
                        <button type="button" onClick={ this.authorize } className="button" disabled={ ! this.getSelectedProvider() }>
                            Authorize
                        </button>
                        { this.getManualEntryButtonElement() }
                    </div>
                    <aside className="connection__authorized-account">
                        <ConnectionAvatar
                            provider={ this.getSelectedProvider() }
                            profiles={ this.props.profiles }
                            tokens={ this.props.tokens }
                            onDisconnect={ this.disconnect } />
                    </aside>
                </div>
            </div>
        );
    }
});
