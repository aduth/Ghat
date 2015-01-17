var EventEmitter = require( 'events' ).EventEmitter,
    store = require( 'store' ),
    LocalStore;

LocalStore = module.exports = function( name ) {
    this.name = name;
};

LocalStore.prototype = Object.create( EventEmitter.prototype );

LocalStore.prototype.getAll = function() {
    return store.get( this.name );
};

LocalStore.prototype.get = function( key ) {
    var data = store.get( this.name );

    if ( data ) {
        return data[ key ];
    }
};

LocalStore.prototype.set = function( key, value ) {
    var data = store.get( this.name );

    if ( ! data ) {
        data = {};
    }

    data[ key ] = value;
    store.set( this.name, data );
    this.emit( 'change' );
};
