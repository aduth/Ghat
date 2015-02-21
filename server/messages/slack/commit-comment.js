var format = require( 'util' ).format,
    helpers = require( '../../helpers/' ),
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] New comment on commit %s by %s', body.repository.full_name, helpers.formatting.shortCommitSha( body.comment.commit_id ), body.comment.user.login ),
        pretext: format( '[%s] New comment on commit <%s|%s>', body.repository.full_name, body.comment.html_url, helpers.formatting.shortCommitSha( body.comment.commit_id ) ),
        title: format( 'Comment by %s', body.comment.user.login ),
        text: body.comment.body,
        color: constants.app.COLOR_SECONDARY
    };
};
