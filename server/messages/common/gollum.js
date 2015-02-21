var format = require( 'util' ).format;

module.exports = function( body ) {
    if ( ! body.pages.length ) {
        return;
    }

    return format( '[%s] Wiki page %s - %s', body.repository.full_name, body.pages[0].action, body.pages[0].title );
};
