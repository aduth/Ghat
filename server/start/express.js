var bodyParser = require( 'body-parser' ),
    serveStatic = require( 'serve-static' );

module.exports = function( app ) {
    app.use( bodyParser.json({
        verify: function( req, res, buf, next ) {
            /* jshint unused:vars */

            /**
             * While it's desirable to have the request body parsed as JSON,
             * we also want to have access to the original raw body so that we
             * can perform SHA1 hex digest validation.
             */
            req.rawBody = buf.toString();
        }
    }) );

    app.use( serveStatic( __dirname + '/../../public' ) );
};
