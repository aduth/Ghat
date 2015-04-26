describe( 'ghat', function() {
    describe( 'client', function() {
        describe( 'helpers', function() {
            require( './specs/client/helpers/dom' );
        });

        describe( 'stores', function() {
            require( './specs/client/stores/array' );
            require( './specs/client/stores/object' );
        });
    });

    describe( 'server', function() {
        describe( 'helpers', function() {
            require( './specs/server/helpers/compare' );
            require( './specs/server/helpers/field' );
            require( './specs/server/helpers/formatting' );
        });

        describe( 'messages', function() {
            describe( 'common', function() {
                require( './specs/server/messages/common/commit-comment' );
                require( './specs/server/messages/common/create' );
                require( './specs/server/messages/common/delete' );
                require( './specs/server/messages/common/fork' );
                require( './specs/server/messages/common/gollum' );
                require( './specs/server/messages/common/issue-comment' );
                require( './specs/server/messages/common/issues' );
                require( './specs/server/messages/common/pull-request-review-comment' );
                require( './specs/server/messages/common/pull-request' );
                require( './specs/server/messages/common/push' );
                require( './specs/server/messages/common/watch' );
            });

            describe( 'slack', function() {
                require( './specs/server/messages/slack/commit-comment' );
                require( './specs/server/messages/slack/create' );
                require( './specs/server/messages/slack/delete' );
                require( './specs/server/messages/slack/fork' );
                require( './specs/server/messages/slack/gollum' );
                require( './specs/server/messages/slack/issue-comment' );
                require( './specs/server/messages/slack/issues' );
                require( './specs/server/messages/slack/pull-request-review-comment' );
                require( './specs/server/messages/slack/pull-request' );
                require( './specs/server/messages/slack/push' );
                require( './specs/server/messages/slack/watch' );
            });
        });
    });

    describe( 'shared', function() {
        describe( 'integrations', function() {
            require( './specs/shared/integrations/github' );
            require( './specs/shared/integrations/slack' );
        });
    });
});
