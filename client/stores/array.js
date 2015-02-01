var EventEmitter = require( 'events' ).EventEmitter,
    ArrayStore;

ArrayStore = module.exports = function( initial ) {
    this.store = initial || [];
};

ArrayStore.prototype = Object.create( EventEmitter.prototype );

ArrayStore.prototype.get = function() {
    return this.store;
};

ArrayStore.prototype.add = function( value ) {
    this.store.push( value );
    this.emit( 'change' );
};

ArrayStore.prototype.remove = function( index ) {
    this.store.splice( index, 1 );
    this.emit( 'change' );
};

ArrayStore.prototype.removeValue = function( value ) {
    var index = this.store.indexOf( value );

    if ( -1 !== index ) {
        this.remove( index );
    }
};
