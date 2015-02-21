var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    if ( ! body.pages.length ) {
        return;
    }

    return {
        fallback: format( '[%s] Wiki page %s - %s', body.repository.full_name, body.pages[0].action, body.pages[0].title ),
        pretext: format( '[%s] Wiki page %s', body.repository.full_name, body.pages[0].action ),
        title: format( '%s', body.pages[0].title ),
        title_link: body.pages[0].html_url,
        color: constants.app.COLOR_SECONDARY
    };
};
