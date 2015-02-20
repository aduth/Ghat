var expect = require( 'chai' ).expect,
    formatting = require( '../../../../server/helpers/formatting' );

describe( 'formatting', function() {
    describe( '#ucfirst()', function() {
        it( 'should gracefully handle bad input', function() {
            expect( formatting.ucfirst( '' ) ).to.be.a( 'string' );
            expect( formatting.ucfirst() ).to.be.a( 'string' );
        });

        it( 'should capitalize the first letter of the string', function() {
            expect( formatting.ucfirst( 'ghat' ) ).to.equal( 'Ghat' );
        });
    });
});
