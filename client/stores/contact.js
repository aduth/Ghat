var EventEmitter = require( 'events' ).EventEmitter,
    integrations = require( '../../shared/integrations/' ),
    ContactStore;

ContactStore = module.exports = function() {
    this.contacts = {};
    this.fetching = {};
};

ContactStore.prototype = Object.create( EventEmitter.prototype );

ContactStore.prototype.get = function( provider, token ) {
    if ( ! this.contacts[ provider ] ) {
        this.contacts[ provider ] = [];
        this.fetch( provider, token );
    }

    return this.contacts[ provider ];
};

ContactStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getMyAvatar ) {
        return;
    }

    this.fetching[ provider ] = true;

    integrations[ provider ].getContacts( token, function( err, contacts ) {
        if ( ! err ) {
            this.contacts[ provider ] = contacts;
            this.emit( 'change' );
        }

        this.fetching[ provider ] = false;
    }.bind( this ) );
};
