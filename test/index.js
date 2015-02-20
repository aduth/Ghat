describe( 'ghat', function() {
    require( './specs/client/helpers/dom' );
    require( './specs/client/stores/array' );
    require( './specs/client/stores/object' );
    require( './specs/server/helpers/compare' );
    require( './specs/server/helpers/field' );
    require( './specs/server/helpers/formatting' );
    require( './specs/server/messages/common/commit-comment' );
    require( './specs/server/messages/common/create' );
    require( './specs/server/messages/common/fork' );
    require( './specs/server/messages/slack/commit-comment' );
    require( './specs/server/messages/slack/create' );
    require( './specs/server/messages/slack/fork' );
    require( './specs/server/messages/slack/push' );
});
