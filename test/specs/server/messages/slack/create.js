var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/create' ),
    generateMessage = require( '../../../../../server/messages/slack/create' );

describe( 'create', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Tag "0.0.1" created by baxterthehacker' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Tag "0.0.1" created by baxterthehacker' );
    });
});
