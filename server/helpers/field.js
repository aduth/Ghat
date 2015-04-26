var pluck = require( 'lodash/collection/pluck' );

/**
 * Given an object and field name, returns the value of the field name.
 * Supports nested properties, with traversing designated through a "."
 * character. May return an array if the traversal encounters an array.
 *
 * @param  {object} object An object to search
 * @param  {string} field  A field or nested field name
 * @return {mixed}         The value of the field or nested field
 */
module.exports.getValue = function( object, field ) {
    var parts = field.split( '.' );

    return parts.reduce(function( memo, part ) {
        if ( 'object' === typeof memo && part in memo ) {
            /**
             * By returning the desired nested property, we can continue the
             * object traversal by updating the memo to the nested value.
             */
            return memo[ part ];
        } else if ( Array.isArray( memo ) ) {
            /**
             * If an array is encountered, pluck the desired name from each
             * element in the array.
             */
            return pluck( memo, part );
        }
    }, object );
};
