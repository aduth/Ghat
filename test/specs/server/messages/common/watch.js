var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/watch' ),
    generateMessage = require( '../../../../../server/messages/common/watch' );

describe( 'watch', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Repository watched by baxterthehacker' );
    });
});
