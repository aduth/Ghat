var ObjectStore = require( './object' ),
    supportsLocalStorage = 'undefined' !== typeof window && window.localStorage,
    LocalStore;

LocalStore = module.exports = function( name ) {
    ObjectStore.call( this );
    this.name = name;

    if ( supportsLocalStorage ) {
        try {
            this.store = JSON.parse( window.localStorage.getItem( name ) );
        } catch ( e ) {}
    }
    this.store = this.store || {};
};

LocalStore.prototype = Object.create( ObjectStore.prototype );

LocalStore.prototype.set = function( key, value ) {
    ObjectStore.prototype.set.call( this, key, value );

    if ( supportsLocalStorage ) {
        window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
    }
};

LocalStore.prototype.remove = function( key ) {
    ObjectStore.prototype.remove.call( this, key );

    if ( supportsLocalStorage ) {
        if ( Object.keys( this.store ).length ) {
            window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
        } else {
            window.localStorage.removeItem( this.name );
        }
    }
};
