var ArrayStore = require( './array' ),
    integrations = require( '../../shared/integrations/' ),
    HookStore;

HookStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

HookStore.prototype = Object.create( ArrayStore.prototype );

HookStore.prototype.create = function( token, repository, event, integration ) {
    integrations.github.createWebhook( token, repository, event, integration, function( err, result ) {
        this.add( result );
    }.bind( this ) );
};
