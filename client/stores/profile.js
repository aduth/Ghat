var ObjectStore = require( './object' ),
    integrations = require( '../../shared/integrations/' ),
    ProfileStore;

ProfileStore = module.exports = function() {
    ObjectStore.call( this );
    this.fetching = {};
};

ProfileStore.prototype = Object.create( ObjectStore.prototype );

ProfileStore.prototype.get = function( provider, token ) {
    var profile = ObjectStore.prototype.get.call( this, provider );

    if ( ! profile ) {
        this.fetch( provider, token );
    }

    return profile;
};

ProfileStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getMyProfile ) {
        return;
    }

    this.fetching[ provider ] = true;

    integrations[ provider ].getMyProfile( token, function( err, profile ) {
        if ( ! err ) {
            this.set( provider, profile );
        }

        this.fetching[ provider ] = false;
    }.bind( this ) );
};
