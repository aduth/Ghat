var Director = require( 'director' ).Router,
    controllers = require( './controllers/' );

var Router = module.exports = function() {
    this.router = Director({
        '/': controllers.integrations.index,
        '/configure': controllers.configure.create,
        '/configure/:id': controllers.configure.edit
    }).configure({ html5history: true });
};

Router.prototype.start = function() {
    this.router.init();
};

Router.prototype.attach = function( container ) {
    container.addEventListener( 'click', function( event ) {
        if ( 'A' === event.target.nodeName ) {
            event.preventDefault();
            this.router.setRoute( event.target.href );
        }
    }.bind( this ) );
};
