var format = require( 'util' ).format;

module.exports = {
    info: function( message ) {
        this._log( message, 'info', Array.prototype.slice.call( arguments, 1 ) );
    },

    error: function( message ) {
        this._log( message, 'error', Array.prototype.slice.call( arguments, 1 ) );
    },

    warn: function( message ) {
        this._log( message, 'warn', Array.prototype.slice.call( arguments, 1 ) );
    },

    _log: function( message, type ) {
        var args = Array.prototype.slice.call( arguments, 2 ),
            output = format.apply( format, [ message ].concat( args ) );

        console[ type ]( output );
    }
};
