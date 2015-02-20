/**
 * Given a string, returns a new string with the first character capitalized.
 *
 * @param  {string} string The original string
 * @return {string}        A string with the first character capitalized
 */
module.exports.ucfirst = function( string ) {
    return ( '' + string ).charAt( 0 ).toUpperCase() + ( '' + string ).substr( 1 );
};

/**
 * Given a git commit SHA string, returns a shortened version of the commit SHA.
 *
 * @param  {string} sha A git commit SHA
 * @return {string}     A shortened git commit SHA
 */
module.exports.shortCommitSha = function( sha ) {
    return sha.substr( 0, 7 );
};
