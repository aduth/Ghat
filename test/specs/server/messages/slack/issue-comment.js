var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issue-comment' ),
    generateMessage = require( '../../../../../server/messages/slack/issue-comment' );

describe( 'issue-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] New comment on issue #51: Spelling error in the README file' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] New comment on issue <https://github.com/baxterthehacker/public-repo/issues/51#issuecomment-58596796|#51: Spelling error in the README file>' );
        expect( message.title ).to.equal( 'Comment by baxterthehacker' );
        expect( message.text ).to.equal( 'You are totally right! I\'ll get this fixed right away.' );
    });
});
