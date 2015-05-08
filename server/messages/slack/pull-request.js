var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    var timeSinceCreated, message;

    // Prevent excessive messaging for new pull requests
    if ( 'opened' !== body.action ) {
        timeSinceCreated = Date.now() - Date.parse( body.pull_request.created_at );
        if ( timeSinceCreated < constants.app.ISSUE_IGNORE_CREATED_WITHIN_MS ) {
            return;
        }
    }

    // Generate message
    message = {
        fallback: format( '[%s] Pull request %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.pull_request.number, body.pull_request.title ),
        pretext: format( '[%s] Pull request %s by %s', body.repository.full_name, body.action, body.sender.login ),
        title: format( '#%d: %s', body.pull_request.number, body.pull_request.title ),
        title_link: body.pull_request.html_url,
        color: constants.app.COLOR_SECONDARY
    };

    // Only include body of the pull request when first created
    if ( 'opened' === body.action ) {
        message.text = body.pull_request.body;
    }

    return message;
};
