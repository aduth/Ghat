var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/pull-request' ),
    generateMessage = require( '../../../../../server/messages/common/pull-request' );

describe( 'pull-request', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Pull request opened by baxterthehacker - #50: Update the README with new information' );
    });
});
