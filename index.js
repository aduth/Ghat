var app = require( './server/' ),
    config = require( './shared/config' );

app.listen( config.port, function() {
    console.log( 'Listening on port %d...', config.port );
});
