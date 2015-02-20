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

    describe( '#shortCommitSha', function() {
        it( 'should return a shortened git SHA', function() {
            expect( formatting.shortCommitSha( '7700ca29dd050d9adacc0803f866d9b539513535' ) ).to.equal( '7700ca2' );
        });
    });
});
