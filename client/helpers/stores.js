var stores = require( '../stores/' ),
    instances = {};

module.exports.getSingletonInstance = function( store ) {
    if ( store in stores && ! ( store in instances ) ) {
        instances[ store ] = new stores[ store ]();
    }

    return instances[ store ];
};
