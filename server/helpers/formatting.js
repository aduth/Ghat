/**
 * Given a string, returns a new string with the first character capitalized.
 *
 * @param  {string} string The original string
 * @return {string}        A string with the first character capitalized
 */
module.exports.ucfirst = function( string ) {
    return ( '' + string ).charAt( 0 ).toUpperCase() + ( '' + string ).substr( 1 );
};
