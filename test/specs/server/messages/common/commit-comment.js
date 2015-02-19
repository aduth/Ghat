var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/commit-comment' ),
    generateMessage = require( '../../../../../server/messages/common/commit-comment' );

describe( 'messages/common/commit-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] New comment on commit 7b80eb1 by baxterthehacker' );
    });
});
