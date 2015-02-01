var EventEmitter = require( 'events' ).EventEmitter,
    ArrayStore;

/**
 * The store constructor, accepting an optinal initial value.
 *
 * @param {Array} initial An optional initial value
 */
ArrayStore = module.exports = function( initial ) {
    this.store = initial || [];
};

ArrayStore.prototype = Object.create( EventEmitter.prototype );

/**
 * Returns all values saved to the store.
 *
 * @return {Object} The store values
 */
ArrayStore.prototype.get = function() {
    return this.store;
};

/**
 * Adds a value to the store. Emits a `change` event.
 *
 * @param {mixed} value A value to save to the store
 */
ArrayStore.prototype.add = function( value ) {
    this.store.push( value );
    this.emit( 'change' );
};

/**
 * Removes a value saved to the store by index. Emits a `change` event.
 *
 * @param {number} index The index of the value to be removed
 */
ArrayStore.prototype.remove = function( index ) {
    this.store.splice( index, 1 );
    this.emit( 'change' );
};

/**
 * Removes a value saved to the store by value. Emits a `change` event.
 *
 * @param {mixed} value A value to remove from the store
 */
ArrayStore.prototype.removeValue = function( value ) {
    var index = this.store.indexOf( value );

    if ( -1 !== index ) {
        this.remove( index );
    }
};
