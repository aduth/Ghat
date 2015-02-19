var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] New comment on commit %s by %s', body.repository.full_name, body.comment.commit_id.substr( 0, 7 ), body.comment.user.login );
};
