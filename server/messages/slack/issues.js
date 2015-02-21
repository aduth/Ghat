var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] Issue %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.issue.number, body.issue.title ),
        pretext: format( '[%s] Issue %s by %s', body.repository.full_name, body.action, body.sender.login ),
        title: format( '#%d: %s', body.issue.number, body.issue.title ),
        title_link: body.issue.html_url,
        text: body.issue.body,
        color: constants.app.COLOR_SECONDARY
    };
};
