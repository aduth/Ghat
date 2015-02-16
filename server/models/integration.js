var mongoose = require( 'mongoose' ),
    crypto = require( 'crypto' ),
    bcrypt = require( 'bcrypt' ),
    async = require( 'async' ),
    merge = require( 'lodash/object/merge' ),
    config = require( '../../shared/config' ),
    helpers = require( '../../shared/helpers/' ),
    schema, filterByGitHubToken;

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
    github: {
        hookId: Number,
        repository: String,
        token: String,
        events: [ String ]
    },
    secret: {
        type: String,
        default: function() {
            return crypto.randomBytes( config.security.secretLength ).toString( 'hex' );
        }
    },
    filters: [{
        field: String,
        operator: {
            type: String,
            enum: [ '!=', '<', '<=', '=', '>=', '>', 'in', 'contains' ],
            default: '='
        },
        value: String
    }]
}, { versionKey: false });

filterByGitHubToken = function( integrations, githubToken, next ) {
    async.filter( integrations, function( integration, asyncNext ) {
        bcrypt.compare( githubToken, integration.github.token, function( err, res ) {
            if ( err ) {
                return next( err );
            }

            asyncNext( res );
        });
    }, function( integrations ) {
        next( null, integrations );
    });
};

schema.statics.findOneFilteredByGitHubToken = function( query, githubToken, next ) {
    this.findOne( query, function( err, integration ) {
        if ( err || ! integration ) {
            return next( err );
        }

        filterByGitHubToken([ integration ], githubToken, function( err, integrations ) {
            var integration;
            if ( integrations && integrations.length ) {
                integration = integrations[0];
            }

            next( err, integration );
        });
    });
};

schema.statics.findOneAndRemoveFilteredByGitHubToken = function( query, githubToken, next ) {
    this.findOneFilteredByGitHubToken( query, githubToken, function( err, integration ) {
        if ( err || ! integration ) {
            return next( err );
        }

        this.remove({ _id: integration._id }, next );
    }.bind( this ) );
};

schema.statics.findOneAndUpdateFilteredByGitHubToken = function( query, doc, githubToken, next ) {
    this.findOneFilteredByGitHubToken( query, githubToken, function( err, integration ) {
        if ( err || ! integration ) {
            return next( err );
        }

        merge( integration, doc );
        integration.save( next );
    }.bind( this ) );
};

schema.statics.findFilteredByGitHubToken = function( query, githubToken, next ) {
    this.find( query, function( err, integrations ) {
        if ( err ) {
            return next( err );
        }

        filterByGitHubToken( integrations, githubToken, next );
    });
};

schema.pre( 'save', function( next ) {
    bcrypt.hash( this.github.token, config.security.bcryptWorkFactor, function( err, hash ) {
        this.github.token = hash;
        next( err );
    }.bind( this ) );
});

module.exports = mongoose.model( 'Integration', schema );
