var expect = require( 'chai' ).expect,
    payload = require( '../../../../fixtures/payloads/issues' ),
    generateMessage = require( '../../../../../server/messages/slack/issues' );

describe( 'issues', function() {
    it( 'should not generate a message for non-opened action if newly created', function() {
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

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker - #51: Spelling error in the README file' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Issue labeled by baxterthehacker' );
        expect( message.title ).to.equal( '#51: Spelling error in the README file' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/issues/51' );
        expect( message.text ).to.be.empty;
        expect( message.fields ).to.eql([{
            title: 'Label added',
            value: 'bug',
            short: true
        }]);
    });

    it( 'should include the text for opened action only', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.action = 'opened';
        message = generateMessage( copy );

        expect( message.text ).to.be.equal( 'It looks like you accidently spelled \'commit\' with two \'t\'s.' );
    });

    it( 'should omit fields if not assigned or labeled', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.action = 'opened';
        message = generateMessage( copy );

        expect( message.fields ).to.be.undefined;
    });

    it( 'should generate the expected message for assigned action', function() {
        var copy = JSON.parse( JSON.stringify( payload ) ),
            message;

        copy.action = 'assigned';
        copy.assignee = { login: 'aduth' };
        message = generateMessage( copy );

        expect( message.fallback ).to.equal( '[baxterthehacker/public-repo] Issue assigned by baxterthehacker - #51: Spelling error in the README file' );
        expect( message.pretext ).to.equal( '[baxterthehacker/public-repo] Issue assigned by baxterthehacker' );
        expect( message.title ).to.equal( '#51: Spelling error in the README file' );
        expect( message.title_link ).to.equal( 'https://github.com/baxterthehacker/public-repo/issues/51' );
        expect( message.text ).to.be.empty;
        expect( message.fields ).to.eql([{
            title: 'User assigned',
            value: 'aduth',
            short: true
        }]);
    });
});
