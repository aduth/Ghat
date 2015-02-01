var expect = require( 'chai' ).expect,
    compare = require( '../../../server/helpers/compare' );

describe( 'compare', function() {
    describe( '#isMatch()', function() {
        /**
         * default
         */
        it( 'should default to = if unrecognized or missing operator', function() {
            expect( compare.isMatch( 1, 'bad', 1 ) ).to.be.ok;
            expect( compare.isMatch( 1, 'bad', 2 ) ).to.not.be.ok;
        });

        /**
         * =
         */
        it( 'should return true for = if =', function() {
            expect( compare.isMatch( 1, '=', 1 ) ).to.be.ok;
        });

        it( 'should return false for = if not =', function() {
            expect( compare.isMatch( 1, '=', 2 ) ).to.not.be.ok;
        });

        /**
         * !=
         */
        it( 'should return true for != if !=', function() {
            expect( compare.isMatch( 1, '!=', 2 ) ).to.be.ok;
        });

        it( 'should return false for != if not !=', function() {
            expect( compare.isMatch( 1, '!=', 1 ) ).to.not.be.ok;
        });

        /**
         * <
         */
        it( 'should return true for < if <', function() {
            expect( compare.isMatch( 1, '<', 2 ) ).to.be.ok;
        });

        it( 'should return false for < if not <', function() {
            expect( compare.isMatch( 1, '<', 1 ) ).to.not.be.ok;
        });

        /**
         * <=
         */
        it( 'should return true for <= if <=', function() {
            expect( compare.isMatch( 1, '<=', 1 ) ).to.be.ok;
        });

        it( 'should return false for <= if not <=', function() {
            expect( compare.isMatch( 1, '<=', 0 ) ).to.not.be.ok;
        });

        /**
         * >=
         */
        it( 'should return true for >= if >=', function() {
            expect( compare.isMatch( 1, '>=', 1 ) ).to.be.ok;
        });

        it( 'should return false for >= if not >=', function() {
            expect( compare.isMatch( 1, '>=', 2 ) ).to.not.be.ok;
        });

        /**
         * >
         */
        it( 'should return true for > if >', function() {
            expect( compare.isMatch( 2, '>', 1 ) ).to.be.ok;
        });

        it( 'should return false for > if not >', function() {
            expect( compare.isMatch( 1, '>', 1 ) ).to.not.be.ok;
        });

        /**
         * in
         */
        it( 'should return true for in if in', function() {
            expect( compare.isMatch( 1, 'in', [ 1, 2 ]) ).to.be.ok;
        });

        it( 'should return false for in if not in', function() {
            expect( compare.isMatch( 1, 'in', [ 2, 3 ]) ).to.not.be.ok;
        });

        /**
         * contains
         */
        it( 'should return true for contains if contains', function() {
            expect( compare.isMatch([ 1, 2 ], 'contains', 1 ) ).to.be.ok;
        });

        it( 'should return false for contains if not contains', function() {
            expect( compare.isMatch([ 2, 3 ], 'contains', 1 ) ).to.not.be.ok;
        });

        /**
         * matches
         */
        it( 'should return true for matches if matches', function() {
            expect( compare.isMatch( '^[hH]ell', 'matches', 'Hello World!' ) ).to.be.ok;
        });

        it( 'should return false for matches if not matches', function() {
            expect( compare.isMatch( '^hell', 'matches', 'Hello world!' ) ).to.not.be.ok;
        });
    });
});
