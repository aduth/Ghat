var router = module.exports = require( 'express' ).Router(),
    config = require( '../../config' ),
    errors = require( '../errors/' ),
    responses = require( '../responses/' ),
    integrations = require( '../integrations/' );

/**
 * GET /authorize/:provider
 * Redirects a user to the OAuth authorization URL for the specified provider
 */
router.get( '/:provider', function( req, res, next ) {
    if ( ! ( req.params.provider in integrations ) ) {
        next( new errors.UnknownProvider() );
    } else {
        res.redirect( integrations[ req.params.provider ].oauth.client.getAuthorizeUrl({
            redirect_uri: config.origin + '/authorize/' + req.params.provider + '/callback',
            scope: integrations[ req.params.provider ].oauth.scope
        }) );
    }
});

/**
 * GET /authorize/:provider/callback
 * The redirect route once OAuth authorization has completed
 */
router.get( '/:provider/callback', function( req, res, next ) {
    integrations[ req.params.provider ].oauth.client.getOAuthAccessToken( req.query.code, {
        redirect_uri: config.origin + '/authorize/' + req.params.provider + '/callback'
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