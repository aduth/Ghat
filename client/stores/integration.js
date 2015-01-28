var request = require( 'superagent' ),
    crypto = require( 'crypto' ),
    shortId = require( 'shortid' ),
    assign = require( 'lodash/object/assign' ),
    ArrayStore = require( './array' ),
    config = require( '../../config' ),
    IntegrationStore;

IntegrationStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

IntegrationStore.prototype = Object.create( ArrayStore.prototype );

IntegrationStore.prototype.create = function( integration ) {
    integration = assign( {}, integration, {
        _id: shortId.generate(),
        secret: crypto.randomBytes( config.security.secretLength ).toString( 'hex' )
    });

    request.post( config.origin + '/integration' )
        .send( integration )
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.add( res.body );
            }
        }.bind( this ) );

    return integration;
};
