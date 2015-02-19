var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] New comment on commit <%s|%s> by <%s|%s>', body.repository.full_name, body.comment.html_url, body.comment.commit_id.substr( 0, 7 ), body.comment.user.html_url, body.comment.user.login ),
        pretext: format( '[%s] New comment on commit <%s|%s>', body.repository.full_name, body.comment.html_url, body.comment.commit_id.substr( 0, 7 ) ),
        title: format( 'Comment by %s', body.comment.user.login ),
        text: body.comment.body,
        color: constants.app.COLOR_SECONDARY
    };
};
