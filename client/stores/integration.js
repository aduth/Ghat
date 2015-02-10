var request = require( 'superagent' ),
    ArrayStore = require( './array' ),
    config = require( '../../config' ),
    IntegrationStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
IntegrationStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

IntegrationStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Given an integration object, invokes a network request to the Ghat app to
 * save the desired integration. When the request is complete, the integration
 * is saved to the store and a `change` event is emitted.
 *
 * @param {string}   integration An object describing the desired integration
 * @param {Function} next        A callback to trigger when the request finishes
 */
IntegrationStore.prototype.create = function( integration, next ) {
    request.post( config.origin + '/integration' )
        .send( integration )
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.add( res.body );
            }

            if ( next ) {
                next( err, (res || {}).body );
            }
        }.bind( this ) );

    return integration;
};
