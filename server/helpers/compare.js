module.exports.isMatch = function( source, operator, target ) {
    switch ( operator ) {
        case '!=': return source !== target;
        case '<': return source < target;
        case '<=': return source <= target;
        case '>=': return source >= target;
        case '>': return source > target;
        case 'in': return -1 !== target.indexOf( source );
        case 'contains': return -1 !== source.indexOf( target );
        default: return source === target;
    }
};
