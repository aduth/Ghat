var bodyParser = require( 'body-parser' ),
    serveStatic = require( 'serve-static' );

module.exports = function( app ) {
    app.use( bodyParser.json({
        verify: function( req, res, buf, next ) {
            /* jshint unused:vars */
            req.rawBody = buf.toString();
        }
    }) );
    app.use( serveStatic( __dirname + '/../../public' ) );
};
