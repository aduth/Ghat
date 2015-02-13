var app = module.exports = require( 'express' )(),
    responses = require( './responses/' );

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
app.use( '/api/*', responses.notFound.failure );
app.use( '*', responses.file( 'index.html' ).success );
