var assign = require( 'lodash/object/assign' ),
    eventMonitor = require( './event-monitor' );

module.exports = function( stores ) {
    return assign({}, eventMonitor( stores, 'change', 'forceUpdateIfMounted' ), {
        forceUpdateIfMounted: function() {
            if ( this.isMounted() ) {
                this.forceUpdate();
            }
        }
    });
};
