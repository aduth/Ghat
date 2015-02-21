var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/watch' ),
    generateMessage = require( '../../../../../server/messages/slack/watch' );

describe( 'watch', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Repository watched by baxterthehacker' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Repository watched by baxterthehacker' );
    });
});
