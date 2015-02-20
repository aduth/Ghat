var format = require( 'util' ).format,
    helpers = require( '../../helpers/' );

module.exports = function( body ) {
    return format( '[%s] New comment on commit %s by %s', body.repository.full_name, helpers.formatting.shortCommitSha( body.comment.commit_id ), body.comment.user.login );
};
