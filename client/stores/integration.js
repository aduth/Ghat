var EventEmitter = require( 'events' ).EventEmitter,
    request = require( 'superagent' ),
    crypto = require( 'crypto' ),
    shortId = require( 'shortid' ),
    assign = require( 'lodash-node/modern/objects/assign' ),
    config = require( '../../config' ),
    IntegrationStore;

IntegrationStore = module.exports = function() {
    this.data = [];
};

IntegrationStore.prototype = Object.create( EventEmitter.prototype );

IntegrationStore.prototype.get = function() {
    return this.data;
};

IntegrationStore.prototype.create = function( integration ) {
    integration = assign( {}, integration, {
        _id: shortId.generate(),
        secret: crypto.randomBytes( config.security.secretLength ).toString( 'hex' )
    });

    request.post( config.origin + '/integration' )
        .send( integration )
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.data.push( res.body );
                this.emit( 'change' );
            }
        }.bind( this ) );

    return integration;
};
