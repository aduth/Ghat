var mongoose = require( 'mongoose' ),
    crypto = require( 'crypto' ),
    config = require( '../../config' ),
    integrations = require( '../integrations/' ),
    schema;

schema = new mongoose.Schema({
    _id: String,
    chat: {
        provider: {
            type: String,
            enum: Object.keys( integrations ).filter(function( name ) {
                return 'function' === typeof integrations[ name ].sendMessage;
            })
        },
        token: String,
        channel: String
    },
    github: {
        event: {
            type: String,
            default: '*'
        }
    },
    secret: {
        type: String,
        default: function() {
            return crypto.randomBytes( config.security.secretLength ).toString( 'hex' );
        }
    }
}, { versionKey: false });

module.exports = mongoose.model( 'Integration', schema );