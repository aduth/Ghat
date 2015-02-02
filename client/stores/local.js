var ObjectStore = require( './object' ),
    LocalStore;

module.exports = 'undefined' === typeof window || ! window.localStorage ? ObjectStore : LocalStore;

/**
 * The store constructor. Accepts a name to be used as the key in the browser's
 * localStorage.
 *
 * @param {string} name A name to be used as a key in the brower's localStorage
 */
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

/**
 * Saves a value to the store using the specified key. The saved value is
 * persisted to the browser's localStorage. Emits a `change` event.
 *
 * @param {mixed} key   The key to be used for later retrieval
 * @param {mixed} value A value to save to the store
 */
LocalStore.prototype.set = function( key, value ) {
    ObjectStore.prototype.set.call( this, key, value );
    window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
};

/**
 * Removes a value saved to the store by key. The new store is persisted to the
 * browser's localStorage, or removed from localStorage if no other keys exist
 * in the store. Emits a `change` event.
 *
 * @param {mixed} key The key of the value to be removed
 */
LocalStore.prototype.remove = function( key ) {
    ObjectStore.prototype.remove.call( this, key );

    if ( Object.keys( this.store ).length ) {
        window.localStorage.setItem( this.name, JSON.stringify( this.store ) );
    } else {
        window.localStorage.removeItem( this.name );
    }
};
