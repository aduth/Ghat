var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/gollum' ),
    generateMessage = require( '../../../../../server/messages/common/gollum' );

describe( 'gollum', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message ).to.equal( '[baxterthehacker/public-repo] Wiki page edited - Home' );
    });

    it( 'should not generate a message if no pages exist', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.pages = [];
        message = generateMessage( copy );

        expect( message ).to.be.undefined;
    });
});
