var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issues' ),
    generateMessage = require( '../../../../../server/messages/common/issues' );

describe( 'issues', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker - #51: Spelling error in the README file' );
    });
});
