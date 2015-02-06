var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] Pull request %s by %s - #%d %s', body.repository.full_name, body.action, body.sender.login, body.pull_request.number, body.pull_request.title ),
        pretext: format( '[%s] Pull request %s by %s', body.repository.full_name, body.action, body.sender.login ),
        title: format( '#%d %s', body.pull_request.number, body.pull_request.title ),
        title_link: body.pull_request.html_url,
        color: constants.app.COLOR_SECONDARY
    };
};
