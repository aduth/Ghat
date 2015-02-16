var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash/array/flatten' ),
    difference = require( 'lodash/array/difference' ),
    sortBy = require( 'lodash/collection/sortBy' ),
    config = require( '../config' ),
    oauth;

oauth = module.exports.oauth = {
    client: new OAuth2(
        config.github.clientId,
        config.github.clientSecret,
        'https://github.com/',
        'login/oauth/authorize',
        'login/oauth/access_token',
        null
    ),
    query: { scope: [ 'repo' ] }
};

module.exports.name = 'GitHub';

module.exports.verify = function( token, next ) {
    request.get( 'https://api.github.com/user' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            var headerScopes = ( res.headers['x-oauth-scopes'] || '' ).split( ',' ),
                isInvalid = ! err && ( 200 !== res.status || difference( oauth.query.scope, headerScopes ).length );

            next( err || isInvalid );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to GitHub to
 * request the profile information for the user associated with the token.
 *
 * @param {string}   token A valid GitHub OAuth2 token
 * @param {Function} next  A callback to trigger when the request finishes
 */
module.exports.getMyProfile = function( token, next ) {
    request.get( 'https://api.github.com/user' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            err = err || res.error;

            var profile;
            if ( ! err ) {
                profile = {
                    username: res.body.login,
                    avatar: res.body.avatar_url
                };
            }

            next( err, profile );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to GitHub to
 * request the available repositories for the user associated with the token.
 *
 * @param {string}   token A valid GitHub OAuth2 token
 * @param {Function} next  A callback to trigger when the request finishes
 */
module.exports.getRepositories = function( token, next ) {
    var fetchArray = function( url ) {
        return function( asyncNext ) {
            request.get( url )
                .set({ Accept: 'application/vnd.github.moondragon+json' })
                .set({ Authorization: 'token ' + token })
                .end(function( err, res ) {
                    asyncNext( err || res.error, res.body || [] );
                });
        };
    };

    async.parallel([
        fetchArray( 'https://api.github.com/user/repos' ),
        function( asyncNext ) {
            fetchArray( 'https://api.github.com/user/teams' )(function( err, teams ) {
                async.series( teams.map(function( team ) {
                    return fetchArray( team.repositories_url );
                }), asyncNext );
            });
        }
    ], function( err, repositories ) {
        var sortedRepositories = sortBy( flatten( repositories, true ), 'full_name' );
        next( err, sortedRepositories );

    });
};

/**
 * Given an OAuth token, webhook details, and callback, invokes a network
 * request to GitHub to create the desired webhook at the repository.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to base the
 *                               GitHub webhook
 * @param {Function} next        A callback to trigger when the request finishes
 */
module.exports.createWebhook = function( token, integration, next ) {
    request.post( 'https://api.github.com/repos/' + integration.github.repository + '/hooks' )
        .set({ Authorization: 'token ' + token })
        .send({
            name: 'web',
            config: {
                url: config.origin + '/api/event/?integration_id=' + integration._id,
                secret: integration.secret,
                content_type: 'json'
            },
            events: integration.github.events
        })
        .end(function( err, res ) {
            err = err || res.error;

            var hook;
            if ( ! err ) {
                hook = res.body;
            }

            next( err, hook );
        });
};

/**
 * Given an OAuth token, webhook details, and callback, invokes a network
 * request to GitHub to update the desired webhook at the repository.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to base the
 *                               GitHub webhook
 * @param {Function} next        A callback to trigger when the request finishes
 */
module.exports.updateWebhook = function( token, integration, next ) {
    request.patch( 'https://api.github.com/repos/' + integration.github.repository + '/hooks/' + integration.github.hookId )
        .set({ Authorization: 'token ' + token })
        .send({ events: integration.github.events })
        .end(function( err, res ) {
            err = err || res.error;

            var hook;
            if ( ! err ) {
                hook = res.body;
            }

            next( err, hook );
        });
};

/**
 * Given an OAuth token, webhook details, and callback, invokes a network
 * request to GitHub to create the desired webhook at the repository.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to derive the
 *                               GitHub webhook to remove
 * @param {Function} next        A callback to trigger when the request finishes
 */
module.exports.removeWebhook = function( token, integration, next ) {
    request.del( 'https://api.github.com/repos/' + integration.github.repository + '/hooks/' + integration.github.hookId )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            next( err || res.error );
        });
};

/**
 * Returns an array of all GitHub webhook events. Each element in the array is
 * an object containing the `event` name and a human-readable `description`.
 *
 * @return {Array} An array of available GitHub events
 */
module.exports.getAvailableEvents = function() {
    return {
        commit_comment: 'Commit commented on',
        create: 'Branch or tag created',
        delete: 'Branch or tag deleted',
        fork: 'Repository forked',
        gollum: 'Wiki page updated',
        issue_comment: 'Issue commented on',
        issues: 'Issue changed',
        pull_request_review_comment: 'Pull Request commented on',
        pull_request: 'Pull Request changed',
        push: 'Commits pushed',
        watch: 'User watches repository'
    };
};

/**
 * Returns an array of predefined filters. Each element in the array is an
 * object containing the `field` name, a human-readable `description`, the
 * available `operators`, and a boolean `isCustom` if the filter is used to
 * enable custom user input.
 *
 * @return {Array} An array of predefined filters
 */
module.exports.getPredefinedFilters = function() {
    return [
        { field: 'issue.labels.name', description: 'Labels assigned', operators: [ 'contains' ] },
        { field: 'sender.login', description: 'Sender username' },
        { field: 'action', description: 'Action', options: [ 'assigned', 'unassigned', 'labeled', 'unlabeled', 'opened', 'closed', 'reopened' ] },
        { field: 'custom', description: 'Custom', operators: [ '=', '!=', '<', '<=', '>=', '>' ], isCustom: true }
    ];
};
