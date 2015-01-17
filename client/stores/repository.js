var EventEmitter = require( 'events' ).EventEmitter,
    integrations = require( '../../shared/integrations/' ),
    RepositoryStore;

RepositoryStore = module.exports = function() {
    this.fetching = false;
};

RepositoryStore.prototype = Object.create( EventEmitter.prototype );

RepositoryStore.prototype.get = function( token ) {
    if ( ! this.repositories || this.token !== token ) {
        this.repositories = [];
        this.token = token;
        this.fetch( token );
    }

    return this.repositories;
};

RepositoryStore.prototype.fetch = function( token ) {
    if ( ! token ) {
        return;
    }

    this.fetching = true;

    integrations.github.getRepositories( token, function( err, repositories ) {
        if ( ! err ) {
            this.repositories = repositories;
            this.emit( 'change' );
        }

        this.fetching = false;
    }.bind( this ) );
};
