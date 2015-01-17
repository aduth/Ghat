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

LocalStore.prototype.remove = function( key ) {
    var data = store.get( this.name );

    delete data[ key ];

    if ( Object.keys( data ).length ) {
        store.set( this.name, data );
    } else {
        store.remove( this.name );
    }

    this.emit( 'change' );
};
