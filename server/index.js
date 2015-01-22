var app = module.exports = require( 'express' )();

/**
 * Configure server
 */
require( './start/db' )( app );
require( './start/express' )( app );

/**
 * Mount sub-modules
 */
app.use( '/authorize', require( './modules/authorize' ) );
app.use( '/integration', require( './modules/integration' ) );
app.use( '/event', require( './modules/event' ) );
app.use( '*', require( './responses/' ).notFound.failure );
