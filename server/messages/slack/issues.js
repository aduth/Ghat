var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    var timeSinceCreated, message;

    // Prevent excessive messaging for new issues
    if ( 'opened' !== body.action ) {
        timeSinceCreated = Date.now() - Date.parse( body.issue.created_at );
        if ( timeSinceCreated < constants.app.ISSUE_IGNORE_CREATED_WITHIN_MS ) {
            return;
        }
    }

    // Generate message
    message = {
        fallback: format( '[%s] Issue %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.issue.number, body.issue.title ),
        pretext: format( '[%s] Issue %s by %s', body.repository.full_name, body.action, body.sender.login ),
        title: format( '#%d: %s', body.issue.number, body.issue.title ),
        title_link: body.issue.html_url,
        color: constants.app.COLOR_SECONDARY
    };

    // Only include body of the issue when first created
    if ( 'opened' === body.action ) {
        message.text = body.issue.body;
    }

    // Assign fields for actions with additional information
    switch ( body.action ) {
        case 'labeled':
        case 'unlabeled':
            message.fields = [{
                title: 'Label ' + ( 'labeled' === body.action ? 'added' : 'removed' ),
                value: body.label.name,
                short: true
            }];
            break;
        case 'assigned':
        case 'unassigned':
            message.fields = [{
                title: 'User ' + ( 'assigned' === body.action ? 'assigned' : 'unassigned' ),
                value: body.assignee.login,
                short: true
            }];
            break;
    }

    return message;
};
