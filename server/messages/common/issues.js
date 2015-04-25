var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    var timeSinceCreated;

    if ( 'opened' !== body.action ) {
        timeSinceCreated = Date.now() - Date.parse( body.issue.created_at );
        if ( timeSinceCreated < constants.app.ISSUE_IGNORE_CREATED_WITHIN_MS ) {
            return;
        }
    }

    return format( '[%s] Issue %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.issue.number, body.issue.title );
};
