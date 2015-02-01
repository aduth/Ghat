/**
 * Given source and target values, and an operator string, returns true if the
 * two values match given the operator.
 *
 * @param  {mixed}   source   The first value
 * @param  {string}  operator The string equivalent of a typical mathematical
 *                            operator ('!=', '=', '<', '<=', '>=', '>', 'in',
 *                            'contains', or 'matches')
 * @param  {mixed}   target   The second value
 * @return {Boolean}          True if the source and target match given the
 *                            operator
 */
module.exports.isMatch = function( source, operator, target ) {
    switch ( operator ) {
        case '!=': return source != target; /* jshint ignore:line */
        case '<': return source < target;
        case '<=': return source <= target;
        case '>=': return source >= target;
        case '>': return source > target;
        case 'in': return ( Array.isArray( target ) || 'string' === typeof target ) && -1 !== target.indexOf( source );
        case 'contains': return ( Array.isArray( source ) || 'string' === typeof source ) && -1 !== source.indexOf( target );
        case 'matches': return new RegExp( source ).test( target );
        default: return source == target; /* jshint ignore:line */
    }
};
