var store = require( '../stores/token' ).getInstance();

module.exports.listen = function() {
    window.addEventListener( 'message', this.readMessage, false );
};

module.exports.stopListening = function() {
    window.removeEventListener( 'message', this.readMessage );
};

module.exports.readMessage = function( event ) {
    if ( event.origin === window.location.protocol + '//' + window.location.host ) {
        try {
            var data = JSON.parse( event.data );
            if ( data.provider && data.accessToken ) {
                store.set( data.provider, data.accessToken );
            }
        } catch ( e ) {}
    }
};