var EventEmitter = require( 'events' ).EventEmitter,
    Router;

Router = module.exports = function() {
    this.isStarted = false;
};

Router.prototype = Object.create( EventEmitter.prototype );

Router.prototype.getRoute = function() {
    if ( this.isStarted && 'undefined' !== typeof window ) {
        return window.location.pathname;
    }
};

Router.prototype.setRoute = function( route ) {
    if ( 'undefined' !== typeof window ) {
        window.history.pushState( null, null, route );
    }
};

Router.prototype.getRouteParameter = function( regex, index ) {
    var route = this.getRoute(),
        matches = 'string' === typeof route && route.match( regex );

    if ( matches && matches.length >= index ) {
        return matches[ index ];
    }
};

Router.prototype.start = function() {
    this.isStarted = true;
};

Router.prototype.attach = function( container ) {
    container.addEventListener( 'click', this.onClick.bind( this ) );
};

Router.prototype.detach = function( container ) {
    container.removeEventListener( 'click', this.onClick.bind( this ) );
};

Router.prototype.onClick = function( event ) {
    if ( 'A' === event.target.nodeName ) {
        event.preventDefault();
        this.setRoute( event.target.href );
        this.emit( 'route' );
    }
};
