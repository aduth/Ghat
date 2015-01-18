var ObjectStore = require( './object' ),
    integrations = require( '../../shared/integrations/' ),
    AvatarStore;

AvatarStore = module.exports = function() {
    ObjectStore.call( this );
    this.fetching = {};
};

AvatarStore.prototype = Object.create( ObjectStore.prototype );

AvatarStore.prototype.get = function( provider, token ) {
    var avatar = ObjectStore.prototype.get.call( this, provider );

    if ( ! avatar ) {
        this.fetch( provider, token );
    }

    return avatar;
};

AvatarStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getMyAvatar ) {
        return;
    }

    this.fetching[ provider ] = true;

    integrations[ provider ].getMyAvatar( token, function( err, avatar ) {
        if ( ! err ) {
            this.set( provider, avatar );
        }

        this.fetching[ provider ] = false;
    }.bind( this ) );
};
