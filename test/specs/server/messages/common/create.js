var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/create' ),
    generateMessage = require( '../../../../../server/messages/common/create' );

describe( 'messages/common/create', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Tag "0.0.1" created by baxterthehacker' );
    });
});
