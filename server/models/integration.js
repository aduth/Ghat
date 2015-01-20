var mongoose = require( 'mongoose' ),
    crypto = require( 'crypto' ),
    config = require( '../../config' ),
    helpers = require( '../../shared/helpers/' ),
    schema;

schema = new mongoose.Schema({
    _id: String,
    chat: {
        provider: {
            type: String,
            enum: helpers.integrations.getChatIntegrations()
        },
        token: String,
        contact: String
    },
    secret: {
        type: String,
        default: function() {
            return crypto.randomBytes( config.security.secretLength ).toString( 'hex' );
        }
    }
}, { versionKey: false });

module.exports = mongoose.model( 'Integration', schema );
