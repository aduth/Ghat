var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issues' ),
    generateMessage = require( '../../../../../server/messages/slack/issues' );

describe( 'issues', function() {
    it( 'should generate the expected message', function() {
        var message = generateMessage( payload );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker - #51: Spelling error in the README file' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker' );
        expect( message.title ).to.equal( '#51: Spelling error in the README file' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/issues/51' );
        expect( message.text ).to.equal( 'It looks like you accidently spelled \'commit\' with two \'t\'s.' );
    });
});
