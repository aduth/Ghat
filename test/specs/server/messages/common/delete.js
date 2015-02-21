var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/delete' ),
    generateMessage = require( '../../../../../server/messages/common/delete' );

describe( 'delete', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Tag "simple-tag" deleted by baxterthehacker' );
    });
});
