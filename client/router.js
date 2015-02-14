var Director = require( 'director' ).Router;

var Router = module.exports = function( routes ) {
    this.router = Director( routes ).configure({ html5history: true });
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
