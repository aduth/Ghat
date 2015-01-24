var router = module.exports = require( 'express' ).Router(),
    crypto = require( 'crypto' ),
    Integration = require( '../models/integration' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' ),
    messages = require( '../messages/' ),
    helpers = require( '../helpers/' ),
    integrations = require( '../../shared/integrations/' );

/**
 * POST /event/
 * Webhook receiver route, expecting a GitHub webhook payload
 */
router.post( '/', function( req, res, next ) {
    var integrationId = req.query.integration_id,
        signature = req.header( 'X-Hub-Signature' ),
        eventName = req.header( 'X-Github-Event' );

    if ( ! signature ) {
        return next( new errors.Unauthorized() );
    } else if ( ! eventName || 'object' !== typeof req.body ) {
        return next( new errors.InvalidRequest() );
    } else if ( ! ( eventName in messages ) ) {
        return next( new errors.NotImplemented() );
    }

    Integration.findById( integrationId, function( err, integration ) {
        var bodyDigest, message, isFilterMatch;

        if ( ! integration ) {
            return next( new errors.NotFound() );
        }

        bodyDigest = crypto.createHmac( 'sha1', integration.secret ).update( req.rawBody ).digest( 'hex' );
        if ( signature !== 'sha1=' + bodyDigest ) {
            return next( new errors.Forbidden() );
        }

        isFilterMatch = integration.filters.every(function( filter ) {
            var bodyValue = helpers.field.getValue( req.body, filter.field );
            return helpers.compare.isMatch( bodyValue, filter.operator, filter.value );
        });

        message = messages[ eventName ]( req.body );

        if ( ! isFilterMatch || ! message ) {
            return next();
        }

        integrations[ integration.chat.provider ].sendMessage(
            message,
            integration.chat.contact,
            integration.chat.token,
            next
        );
    });
}, responses.statusCode.success, responses.statusCode.failure );
