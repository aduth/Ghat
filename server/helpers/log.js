module.exports = {
    info: function( message ) {
        this._log( message, 'info', Array.prototype.slice( arguments, 1 ) );
    },

    error: function( message ) {
        this._log( message, 'error', Array.prototype.slice( arguments, 1 ) );
    },

    warn: function( message ) {
        this._log( message, 'warn', Array.prototype.slice( arguments, 1 ) );
    },

    _log: function( message, type ) {
        var args = Array.prototype.slice( arguments, 2 );
        console[ type ].apply( console, [ message ].concat( args ) );
    }
};
