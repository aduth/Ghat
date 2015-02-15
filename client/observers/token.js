var config = require( '../../shared/config' ),
    _store;

/**
 * Starts listening for messages sent to the current window, saving messages
 * recognized as authorized provider tokens to the specified TokenStore.
 *
 * @param  {TokenStore} store An instance of TokenStore
 */
module.exports.listen = function( store ) {
    _store = store;
    window.addEventListener( 'message', this.readMessage, false );
};

/**
 * Stops listening for messages sent to the current window.
 */
module.exports.stopListening = function() {
    window.removeEventListener( 'message', this.readMessage );
};

/**
 * The handler for reading a message sent to the current window, saving
 * messages recognized as authorized provider tokens to the TokenStore.
 */
module.exports.readMessage = function( event ) {
    if ( event.origin === config.origin ) {
        try {
            var data = JSON.parse( event.data );
            if ( _store && data.provider && data.accessToken ) {
                _store.set( data.provider, data.accessToken );
            }
        } catch ( e ) {}
    }
};
