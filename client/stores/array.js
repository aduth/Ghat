var EventEmitter = require( 'events' ).EventEmitter,
    findIndex = require( 'lodash/array/findIndex' ),
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
ArrayStore.prototype.get = function( index ) {
    if ( index >= 0 ) {
        return this.store[ index ];
    } else {
        return this.store;
    }
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
 * Replaces the current store with the given values. Emits a `change` event.
 *
 * @param {Array} values A new store array
 */
ArrayStore.prototype.set = function( values ) {
    this.store = values;
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

/**
 * Removes an object value saved to the store by matching property query. Emits
 * a `change` event.
 *
 * @param  {Object} query A set of object properties to match
 */
ArrayStore.prototype.findAndRemove = function( query ) {
    var index = findIndex( this.store, query );

    if ( -1 !== index ) {
        this.remove( index );
    }
};
