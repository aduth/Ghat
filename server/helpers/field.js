module.exports.getValue = function( object, field ) {
    var parts = field.split( '.' );

    return parts.reduce(function( memo, part ) {
        if ( 'object' === typeof memo && part in memo ) {
            return memo[ part ];
        }
    }, object );
};
