var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/pull-request-review-comment' ),
    generateMessage = require( '../../../../../server/messages/slack/pull-request-review-comment' );

describe( 'pull-request-review-comment', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Pull request commented on by baxterthehacker - #50: Update the README with new information' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Pull request commented on by baxterthehacker' );
        expect( message.title ).to.equal( '#50: Update the README with new information' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/pull/50' );
        expect( message.text ).to.equal( 'Maybe you should use more emojji on this line.' );
    });
});
