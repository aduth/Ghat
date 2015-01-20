var EventEmitter = require( 'events' ).EventEmitter,
    integrations = require( '../../shared/integrations/' ),
    HookStore;

HookStore = module.exports = function() {
    this.data = [];
};

HookStore.prototype = Object.create( EventEmitter.prototype );

HookStore.prototype.get = function() {
    return this.data;
};

HookStore.prototype.create = function( token, repository, event, integration ) {
    integrations.github.createWebhook( token, repository, event, integration, function( err, result ) {
        this.data.push( result );
        this.emit( 'change' );
    }.bind( this ) );
};
