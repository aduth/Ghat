var EventEmitter = require( 'events' ).EventEmitter,
    supportsLocalStorage = 'undefined' !== typeof window && window.localStorage,
    LocalStore;

LocalStore = module.exports = function( name ) {
    this.name = name;

    if ( supportsLocalStorage ) {
        try {
            this.store = JSON.parse( window.localStorage.getItem( name ) );
        } catch ( e ) {}
    }
    this.store = this.store || {};
};

LocalStore.prototype = Object.create( EventEmitter.prototype );

LocalStore.prototype.getAll = function() {
    return this.store;
};

LocalStore.prototype.get = function( key ) {
    return this.store[ key ];
};

LocalStore.prototype.set = function( key, value ) {
    this.store[ key ] = value;

    if ( supportsLocalStorage ) {
        window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
    }

    this.emit( 'change' );
};

LocalStore.prototype.remove = function( key ) {
    delete this.store[ key ];

    if ( supportsLocalStorage ) {
        if ( Object.keys( this.store ).length ) {
            window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
        } else {
            window.localStorage.removeItem( this.name );
        }
    }

    this.emit( 'change' );
};
