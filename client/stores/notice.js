var ArrayStore = require( './array' ),
    NoticeStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 * Accepts an optional initial value.
 *
 * @param {Array} initial An optional initial value
 */
NoticeStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

NoticeStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Adds a message to the store, at an optional index position. Emits a `change`
 * event.
 *
 * @param {string} message The message text to be added
 * @param {string} type    The type of message to be added
 * @param {number} index   Optional index at which to insert message
 */
NoticeStore.prototype.add = function( message, type, index ) {
    ArrayStore.prototype.add.call( this, {
        message: message,
        type: type || 'success',
        timestamp: Date.now()
    }, index );
};
