var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issue-comment' ),
    generateMessage = require( '../../../../../server/messages/common/issue-comment' );

describe( 'issue-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] New comment on issue #51: Spelling error in the README file' );
    });
});
