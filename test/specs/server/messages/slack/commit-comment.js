var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/commit-comment' ),
    generateMessage = require( '../../../../../server/messages/slack/commit-comment' );

describe( 'commit-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] New comment on commit 7b80eb1 by baxterthehacker' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] New comment on commit <https://github.com/baxterthehacker/public-repo/commit/7b80eb100206a56523dbda6202d8e5daa05e265b#commitcomment-8108441|7b80eb1>' );
        expect( message.title ).to.equal( 'Comment by baxterthehacker' );
        expect( message.text ).to.equal( 'This is a really good change! :+1:' );
    });
});
