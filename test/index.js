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
            });

            describe( 'slack', function() {
                require( './specs/server/messages/slack/commit-comment' );
                require( './specs/server/messages/slack/create' );
                require( './specs/server/messages/slack/delete' );
                require( './specs/server/messages/slack/fork' );
                require( './specs/server/messages/slack/push' );
            });
        });
    });
});
