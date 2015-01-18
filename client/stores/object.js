var EventEmitter = require( 'events' ).EventEmitter,
    ObjectStore;

ObjectStore = module.exports = function() {
    this.store = {};
};

ObjectStore.prototype = Object.create( EventEmitter.prototype );

ObjectStore.prototype.getAll = function() {
    return this.store;
};

ObjectStore.prototype.get = function( key ) {
    return this.store[ key ];
};

ObjectStore.prototype.set = function( key, value ) {
    this.store[ key ] = value;
    this.emit( 'change' );
};

ObjectStore.prototype.remove = function( key ) {
    delete this.store[ key ];
    this.emit( 'change' );
};
