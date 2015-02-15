var mongoose = require( 'mongoose' ),
    config = require( '../../shared/config' );

module.exports = function() {
    mongoose.connect( config.mongodb.uri );
};
