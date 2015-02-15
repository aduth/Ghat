var router = module.exports = require( 'express' ).Router(),
    config = require( '../../shared/config' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' ),
    integrations = require( '../../shared/integrations/' );

/**
 * GET /authorize/:provider
 * Redirects a user to the OAuth authorization URL for the specified provider
 */
router.get( '/:provider', function( req, res, next ) {
    var query;

    if ( ! ( req.params.provider in integrations ) ) {
        next( new errors.UnknownProvider() );
    } else {
        query = integrations[ req.params.provider ].oauth.query || {};
        query.redirect_uri = config.origin + '/api/authorize/' + req.params.provider + '/callback';
        res.redirect( integrations[ req.params.provider ].oauth.client.getAuthorizeUrl( query ) );
    }
});

/**
 * GET /authorize/:provider/callback
 * The redirect route once OAuth authorization has completed
 */
router.get( '/:provider/callback', function( req, res, next ) {
    integrations[ req.params.provider ].oauth.client.getOAuthAccessToken( req.query.code, {
        redirect_uri: config.origin + '/api/authorize/' + req.params.provider + '/callback',
        grant_type: 'authorization_code'
    }, function ( error, accessToken, refreshToken, result ) {
        if ( error || result.error ) {
            next( new errors.Unauthorized() );
        } else {
            res.data = {
                provider: req.params.provider,
                accessToken: accessToken
            };

            next();
        }
    } );
}, responses.postmessage.success, responses.postmessage.failure );
