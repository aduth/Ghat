var EventEmitter = require( 'events' ).EventEmitter,
    integrations = require( '../../shared/integrations/' ),
    AvatarStore;

AvatarStore = module.exports = function() {
    this.avatars = {};
    this.fetching = {};
};

AvatarStore.prototype = Object.create( EventEmitter.prototype );

AvatarStore.prototype.get = function( provider, token ) {
    if ( ! this.avatars[ provider ] ) {
        this.fetch( provider, token );
    }

    return this.avatars[ provider ];
};

AvatarStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getMyAvatar ) {
        return;
    }

    this.fetching[ provider ] = true;

    integrations[ provider ].getMyAvatar( token, function( err, avatar ) {
        if ( ! err ) {
            this.avatars[ provider ] = avatar;
            this.emit( 'change' );
        }

        this.fetching[ provider ] = false;
    }.bind( this ) );
};