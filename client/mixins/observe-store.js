var assign = require( 'lodash/object/assign' ),
    eventMonitor = require( './event-monitor' );

module.exports = function( stores ) {
    return assign({}, eventMonitor( stores, 'change', 'forceUpdateOnStoreChange' ), {
        forceUpdateOnStoreChange: function() {
            if ( this.isMounted() ) {
                this.forceUpdate();
            }
        }
    });
};
