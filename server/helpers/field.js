var pluck = require( 'lodash/collection/pluck' );

module.exports.getValue = function( object, field ) {
    var parts = field.split( '.' );

    return parts.reduce(function( memo, part ) {
        if ( 'object' === typeof memo && part in memo ) {
            return memo[ part ];
        } else if ( Array.isArray( memo ) ) {
            return pluck( memo, part );
        }
    }, object );
};
