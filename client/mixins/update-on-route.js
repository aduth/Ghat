var assign = require( 'lodash/object/assign' ),
    eventMonitor = require( './event-monitor' );

module.exports = assign({}, eventMonitor( 'route', 'route', 'forceUpdateOnRoute' ), {
    forceUpdateOnRoute: function() {
        if ( this.isMounted() ) {
            this.forceUpdate();
        }
    }
});
