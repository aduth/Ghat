var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/gollum' ),
    generateMessage = require( '../../../../../server/messages/slack/gollum' );

describe( 'gollum', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Wiki page edited - Home' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Wiki page edited' );
        expect( message.title ).to.equal( 'Home' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/wiki/Home' );
    });

    it( 'should not generate a message if no pages exist', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.pages = [];
        message = generateMessage( copy );

        expect( message ).to.be.undefined;
    });
});
