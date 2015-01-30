var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    var page = body.pages[ 0 ] || {};

    return {
        fallback: format( '[%s] Wiki page %s - %s', body.repository.full_name, page.action, page.title ),
        pretext: format( '[%s] Wiki page %s', body.repository.full_name, page.action ),
        title: format( '%s: %s', body.repository.name, page.title ),
        title_link: page.html_url,
        color: constants.app.COLOR_SECONDARY
    };
};
