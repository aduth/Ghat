var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    var timeSinceCreated;

    if ( 'opened' !== body.action ) {
        timeSinceCreated = Date.now() - Date.parse( body.pull_request.created_at );
        if ( timeSinceCreated < constants.app.ISSUE_IGNORE_CREATED_WITHIN_MS ) {
            return;
        }
    }

    return {
        fallback: format( '[%s] Pull request %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.pull_request.number, body.pull_request.title ),
        pretext: format( '[%s] Pull request %s by %s', body.repository.full_name, body.action, body.sender.login ),
        title: format( '#%d: %s', body.pull_request.number, body.pull_request.title ),
        title_link: body.pull_request.html_url,
        text: body.pull_request.body,
        color: constants.app.COLOR_SECONDARY
    };
};
