var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash/array/flatten' ),
    difference = require( 'lodash/array/difference' ),
    sortBy = require( 'lodash/collection/sortBy' ),
    config = require( '../../config' ),
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
    scope: [ 'repo' ]
};

module.exports.name = 'GitHub';

module.exports.verify = function( token, next ) {
    request.get( 'https://api.github.com/user' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            var headerScopes = ( res.headers['x-oauth-scopes'] || '' ).split( ',' ),
                isInvalid = ! err && ( 200 !== res.status || difference( oauth.scope, headerScopes ).length );

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
 * @param {string}   token      A valid GitHub OAuth2 token
 * @param {string}   repository A GitHub repository full name
 * @param {Array}    event      An array of event names for which the webhook
 *                              will be invoked
 * @param {Function} next       A callback to trigger when the request finishes
 */
module.exports.createWebhook = function( token, repository, event, integration, next ) {
    request.post( 'https://api.github.com/repos/' + repository + '/hooks' )
        .set({ Authorization: 'token ' + token })
        .send({
            name: 'web',
            config: {
                url: config.origin + '/event/?integration_id=' + integration._id,
                secret: integration.secret,
                content_type: 'json'
            },
            events: [ event ]
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
 * Returns an array of all GitHub webhook events. Each element in the array is
 * an object containing the `event` name and a human-readable `description`.
 *
 * @return {Array} An array of available GitHub events
 */
module.exports.getAvailableEvents = function() {
    return [
        { event: '*', description: 'Any time any event is triggered (wildcard)' },
        { event: 'commit_comment', description: 'Any time a commit is commented on' },
        { event: 'create', description: 'Any time a branch or tag is created' },
        { event: 'delete', description: 'Any time a branch or tag is deleted' },
        { event: 'deployment', description: 'Any time a repository has a new deployment created from the API' },
        { event: 'deployment_status', description: 'Any time a deployment for a repository has a status update from the API' },
        { event: 'fork', description: 'Any time a repository is forked' },
        { event: 'gollum', description: 'Any time a Wiki page is updated' },
        { event: 'issue_comment', description: 'Any time an Issue is commented on' },
        { event: 'issues', description: 'Any time an Issue is changed' },
        { event: 'member', description: 'Any time a User is added as a collaborator to a non-Organization repository' },
        { event: 'membership', description: 'Any time a User is added or removed from a team Organization hooks only' },
        { event: 'page_build', description: 'Any time a Pages site is built or results in a failed build' },
        { event: 'public', description: 'Any time a repository changes from private to public' },
        { event: 'pull_request_review_comment', description: 'Any time a commit is commented on while inside a Pull Request review' },
        { event: 'pull_request', description: 'Any time a Pull Request is changed' },
        { event: 'push', description: 'Any Git push to a repository' },
        { event: 'repository', description: 'Any time a repository is created Organization hooks only' },
        { event: 'release', description: 'Any time a Release is published in a repository' },
        { event: 'status', description: 'Any time a repository has a status update from the API' },
        { event: 'team_add', description: 'Any time a team is added or modified on a repository' },
        { event: 'watch', description: 'Any time a User watches a repository' },
    ];
};

/**
 * Returns an array of predefined filters. Each element in the array is an
 * object containing the `field` name, a human-readable `description`, the
 * available `operators`, and a boolean `isCustom` if the filter is used to
 * enable custom user input.
 *
 * @return {Array} An array of predefined filters
 */
module.exports.getPredefinedFilters = function( event ) {
    return [
        { field: 'issue.labels.name', description: 'Labels assigned', operators: [ 'contains' ], events: [ 'issue_comment', 'issues' ] },
        { field: 'custom', description: 'Custom', operators: [ '=', '!=', '<', '<=', '>=', '>' ], isCustom: true }
    ].filter(function( filter ) {
        return ! filter.events || -1 !== filter.events.indexOf( event );
    });
};
