var EventEmitter = require( 'events' ).EventEmitter,
    ObjectStore;

ObjectStore = module.exports = function( initial ) {
    this.store = initial || {};
};

ObjectStore.prototype = Object.create( EventEmitter.prototype );

/**
 * Returns all values saved to the store.
 *
 * @return {Object} The store values
 */
ObjectStore.prototype.getAll = function() {
    return this.store;
};

/**
 * Returns a single value saved to the store by key.
 *
 * @param  {mixed} key The key of the value to be retrieved
 * @return {mixed}     A single store value
 */
ObjectStore.prototype.get = function( key ) {
    return this.store[ key ];
};

/**
 * Saves a value to the store using the specified key. Emits a `change` event.
 *
 * @param {mixed} key   The key to be used for later retrieval
 * @param {mixed} value A value to save to the store
 */
ObjectStore.prototype.set = function( key, value ) {
    this.store[ key ] = value;
    this.emit( 'change' );
};

/**
 * Removes a value saved to the store by key. Emits a `change` event.
 *
 * @param {mixed} key The key of the value to be removed
 */
ObjectStore.prototype.remove = function( key ) {
    delete this.store[ key ];
    this.emit( 'change' );
};
