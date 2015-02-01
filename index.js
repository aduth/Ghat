var app = require( './server/' ),
    config = require( './config' );

app.listen( config.port, function() {
    console.log( 'Listening on port %d...', config.port );
});
