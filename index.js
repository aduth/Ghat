var app = require( './server' ),
    port = process.env.PORT || 3000;

app.listen( port, function() {
    console.log( 'Listening on port %d...', port );
});