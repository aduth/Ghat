var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] Repository forked by %s - %s', body.repository.full_name, body.sender.login, body.forkee.full_name ),
        pretext: format( '[%s] Repository forked by %s', body.repository.full_name, body.sender.login ),
        title: body.forkee.full_name,
        title_link: body.forkee.html_url,
        color: constants.app.COLOR_SECONDARY
    };
};
