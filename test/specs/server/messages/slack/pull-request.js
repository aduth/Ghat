var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/pull-request' ),
    generateMessage = require( '../../../../../server/messages/slack/pull-request' );

describe( 'pull-request', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Pull request opened by baxterthehacker - #50: Update the README with new information' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Pull request opened by baxterthehacker' );
        expect( message.title ).to.equal( '#50: Update the README with new information' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/pull/50' );
        expect( message.text ).to.equal( 'This is a pretty simple change that we need to pull into master.' );
    });
});
