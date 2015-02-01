var ObjectStore = require( './object' ),
    LocalStore;

if ( 'undefined' === typeof window || window.localStorage ) {
    module.exports = ObjectStore;
    return;
}

LocalStore = module.exports = function( name ) {
    ObjectStore.call( this );
    this.name = name;

    try {
        this.store = JSON.parse( window.localStorage.getItem( name ) );
    } catch ( e ) {
        this.store = {};
    }
};

LocalStore.prototype = Object.create( ObjectStore.prototype );

LocalStore.prototype.set = function( key, value ) {
    ObjectStore.prototype.set.call( this, key, value );
    window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
};

LocalStore.prototype.remove = function( key ) {
    ObjectStore.prototype.remove.call( this, key );

    if ( Object.keys( this.store ).length ) {
        window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
    } else {
        window.localStorage.removeItem( this.name );
    }
};
