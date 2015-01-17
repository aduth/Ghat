var _store;

module.exports.listen = function( store ) {
    _store = store;
    window.addEventListener( 'message', this.readMessage, false );
};

module.exports.stopListening = function() {
    window.removeEventListener( 'message', this.readMessage );
};

module.exports.readMessage = function( event ) {
    if ( event.origin === window.location.protocol + '//' + window.location.host ) {
        try {
            var data = JSON.parse( event.data );
            if ( _store && data.provider && data.accessToken ) {
                _store.set( data.provider, data.accessToken );
            }
        } catch ( e ) {}
    }
};
