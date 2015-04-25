var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issues' ),
    generateMessage = require( '../../../../../server/messages/common/issues' );

describe( 'issues', function() {
    it( 'should not generate a message if newly created', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.issue.created_at = new Date();
        message = generateMessage( copy );

        expect( message ).to.be.undefined;
    } );

    it( 'should generate a message for opened action if newly created', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.action = 'opened';
        copy.issue.created_at = new Date();
        message = generateMessage( copy );

        expect( message ).to.not.be.undefined;
    } );

    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker - #51: Spelling error in the README file' );
    });
});
