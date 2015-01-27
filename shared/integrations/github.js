var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash-node/modern/arrays/flatten' ),
    sortBy = require( 'lodash-node/modern/collections/sortBy' ),
    config = require( '../../config' );

module.exports.oauth = {
    client: new OAuth2(
        config.github.clientId,
        config.github.clientSecret,
        'https://github.com/',
        'login/oauth/authorize',
        'login/oauth/access_token',
        null
    ),
    scope: [ 'write:repo_hook', 'read:org' ]
};

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

module.exports.getRepositories = function( token, next ) {
    var fetchArray = function( url ) {
        return function( asyncNext ) {
            request.get( url )
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
        var sortedRepositories = sortBy( flatten( repositories ), 'full_name' );
        next( err, sortedRepositories );

    });
};

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

module.exports.getPredefinedFilters = function() {
    return [
        { field: 'issue.labels.name', description: 'Labels assigned', operators: [ 'contains' ] }
    ];
};
