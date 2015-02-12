var router = module.exports = require( 'express' ).Router(),
    Integration = require( '../models/integration' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' );

/**
 * GET /integration/
 * Retrieves a list of integrations
 */
router.get( '/', function( req, res, next ) {
    if ( ! req.query['chat.provider'] || ! req.query['chat.token'] ) {
        return next( new errors.InvalidRequest() );
    }

    Integration.find({
        'chat.provider': req.query['chat.provider'],
        'chat.token': req.query['chat.token']
    }, '_id github', function( err, integrations ) {
        if ( err ) {
            next( err );
        } else {
            res.data = integrations;
            next();
        }
    });
}, responses.json.success, responses.json.failure );

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

/**
 * DELETE /integration/:id
 * Deletes an integration
 */
router.delete( '/:id', function( req, res, next ) {
    if ( ! req.query['chat.provider'] || ! req.query['chat.token'] ) {
        return next( new errors.InvalidRequest() );
    }

    Integration.findOneAndRemove({
        _id: req.params.id,
        'chat.provider': req.query['chat.provider'],
        'chat.token': req.query['chat.token']
    }, function( err, integration ) {
        if ( err ) {
            next( err );
        } else if ( ! integration ) {
            next( new errors.NotFound() );
        } else {
            next();
        }
    });
}, responses.statusCode.success, responses.statusCode.failure );
