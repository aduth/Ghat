var app = module.exports = require( 'express' )(),
    responses = require( './responses/' ),
    routes;

require( 'jsx-require-extension' );
routes = require( '../client/routes' );

/**
 * Configure server
 */
require( './start/db' )( app );
require( './start/express' )( app );

/**
 * Mount sub-modules
 */
app.use( '/api/authorize', require( './modules/authorize' ) );
app.use( '/api/integration', require( './modules/integration' ) );
app.use( '/api/event', require( './modules/event' ) );
app.get( Object.keys( routes ), responses.file( 'index.html' ).success );
app.use( '*', responses.notFound.failure );
