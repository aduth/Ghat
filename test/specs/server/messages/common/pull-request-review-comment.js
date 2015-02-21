var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/pull-request-review-comment' ),
    generateMessage = require( '../../../../../server/messages/common/pull-request-review-comment' );

describe( 'pull-request-review-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Pull request commented on by baxterthehacker - #50: Update the README with new information' );
    });
});
