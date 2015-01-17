var request = require( 'superagent' ),
    OAuth2 = require( 'oauth' ).OAuth2,
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
    scope: [ 'write:repo_hook' ]
};

module.exports.getMyAvatar = function( token, next ) {
    request.get( 'https://api.github.com/user' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            err = err || res.error;

            var avatar;
            if ( ! err ) {
                avatar = res.body.avatar_url;
            }

            next( err, avatar );
        });
};

module.exports.getRepositories = function( token, next ) {
    request.get( 'https://api.github.com/user/repos' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            err = err || res.error;

            var repositories;
            if ( ! err ) {
                repositories = res.body;
            }

            next( err, repositories );
        });
};

module.exports.getAvailableEvents = function() {
    return [
        { event: "*", description: "Any time any event is triggered (wildcard)" },
        { event: "commit_comment", description: "Any time a commit is commented on" },
        { event: "create", description: "Any time a branch or tag is created" },
        { event: "delete", description: "Any time a branch or tag is deleted" },
        { event: "deployment", description: "Any time a repository has a new deployment created from the API" },
        { event: "deployment_status", description: "Any time a deployment for a repository has a status update from the API" },
        { event: "fork", description: "Any time a repository is forked" },
        { event: "gollum", description: "Any time a Wiki page is updated" },
        { event: "issue_comment", description: "Any time an Issue is commented on" },
        { event: "issues", description: "Any time an Issue is changed" },
        { event: "member", description: "Any time a User is added as a collaborator to a non-Organization repository" },
        { event: "membership", description: "Any time a User is added or removed from a team Organization hooks only" },
        { event: "page_build", description: "Any time a Pages site is built or results in a failed build" },
        { event: "public", description: "Any time a repository changes from private to public" },
        { event: "pull_request_review_comment", description: "Any time a commit is commented on while inside a Pull Request review" },
        { event: "pull_request", description: "Any time a Pull Request is changed" },
        { event: "push", description: "Any Git push to a repository" },
        { event: "repository", description: "Any time a repository is created Organization hooks only" },
        { event: "release", description: "Any time a Release is published in a repository" },
        { event: "status", description: "Any time a repository has a status update from the API" },
        { event: "team_add", description: "Any time a team is added or modified on a repository" },
        { event: "watch", description: " Any time a User watches a repository" },
    ];
};
