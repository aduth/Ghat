var router = module.exports = require( 'express' ).Router(),
    Integration = require( '../models/integration' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' );

/**
 * GET /integration/
 * Retrieves a list of integrations
 */
router.get( '/', function( req, res, next ) {
    if ( ! req.query['chat.provider'] || ! req.query['chat.token'] || ! req.query['github.token'] ) {
        return next( new errors.InvalidRequest() );
    }

    Integration.findFilteredByGitHubToken({
        'chat.provider': req.query['chat.provider'],
        'chat.token': req.query['chat.token']
    }, req.query['github.token'], function( err, integrations ) {
        if ( err ) {
            return next( err );
        }

        res.data = integrations.map(function( integration ) {
            integration.secret = null;
            integration.github.token = null;
            return integration;
        });

        next();
    });
}, responses.json.success, responses.json.failure );

/**
 * POST /integration/
 * Creates a new integration
 */
router.post( '/', function( req, res, next ) {
    new Integration( req.body ).save(function( err ) {
        if ( err ) {
            next( new errors.InvalidRequest() );
        } else {
            res.code = 201;
            next();
        }
    });
}, responses.statusCode.success, responses.statusCode.failure );

/**
 * PUT /integration/:id
 * Updates an existing integration
 */
router.put( '/:id', function( req, res, next ) {
    if ( ! req.body.chat.provider || ! req.body.chat.token || ! req.body.github.token ) {
        return next( new errors.InvalidRequest() );
    }

    Integration.findOneAndUpdateFilteredByGitHubToken({
        _id: req.params.id,
        'chat.provider': req.body.chat.provider,
        'chat.token': req.body.chat.token
    }, req.body, req.body.github.token, function( err, integration ) {
        if ( err ) {
            next( err );
        } else if ( ! integration ) {
            next( new errors.NotFound() );
        } else {
            res.code = 204;
            next();
        }
    });
}, responses.statusCode.success, responses.statusCode.failure );

/**
 * DELETE /integration/:id
 * Deletes an integration
 */
router.delete( '/:id', function( req, res, next ) {
    if ( ! req.query['chat.provider'] || ! req.query['chat.token'] || ! req.query['github.token'] ) {
        return next( new errors.InvalidRequest() );
    }

    Integration.findOneAndRemoveFilteredByGitHubToken({
        _id: req.params.id,
        'chat.provider': req.query['chat.provider'],
        'chat.token': req.query['chat.token']
    }, req.query['github.token'], function( err, integration ) {
        if ( err ) {
            next( err );
        } else if ( ! integration ) {
            next( new errors.NotFound() );
        } else {
            next();
        }
    });
}, responses.statusCode.success, responses.statusCode.failure );
