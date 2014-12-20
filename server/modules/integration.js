var router = module.exports = require( 'express' ).Router(),
    Integration = require( '../models/integration' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' );

/**
 * POST /integration/
 * Creates a new integration
 */
router.post( '/', function( req, res, next ) {
    new Integration( req.body ).save(function( err, integration ) {
        if ( err ) {
            next( new errors.InvalidRequest() );
        } else {
            res.data = integration;
            next();
        }
    });
}, responses.json.success, responses.json.failure );