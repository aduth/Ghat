var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] New comment on issue #%d: %s', body.repository.full_name, body.issue.number, body.issue.title ),
        pretext: format( '[%s] New comment on issue <%s|#%d: %s>', body.repository.full_name, body.comment.html_url, body.issue.number, body.issue.title ),
        title: format( 'Comment by %s', body.comment.user.login ),
        text: body.comment.body,
        color: constants.app.COLOR_SECONDARY
    };
};
