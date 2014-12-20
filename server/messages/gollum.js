var format = require( 'util' ).format;

module.exports = function( body ) {
    var page = body.pages[ 0 ] || {};

    return {
        text: format( 'The page %s was %s', page.title, page.action ),
        url: page.html_url
    };
};