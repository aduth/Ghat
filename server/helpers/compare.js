module.exports.isMatch = function( source, operator, target ) {
    switch ( operator ) {
        case '!=': return source !== target;
        case '<': return source < target;
        case '<=': return source <= target;
        case '>=': return source >= target;
        case '>': return source > target;
        case 'in': return ( Array.isArray( target ) || 'string' === typeof target ) && -1 !== target.indexOf( source );
        case 'contains': return ( Array.isArray( source ) || 'string' === typeof source ) && -1 !== source.indexOf( target );
        default: return source === target;
    }
};
