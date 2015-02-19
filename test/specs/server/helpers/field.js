var expect = require( 'chai' ).expect,
    field = require( '../../../../server/helpers/field' );

describe( 'field', function() {
    describe( '#getValue()', function() {
        var object = {
            a: 1,
            b: {
                c: 2,
                d: [{
                    e: 3,
                    f: {
                        g: 4
                    }
                }]
            }
        };

        it( 'should return undefined if property doesn\'t exist', function() {
            expect( field.getValue( object, 'c' ) ).to.be.undefined;
        });

        it( 'should return the value of a root property', function() {
            expect( field.getValue( object, 'a' ) ).to.equal( object.a );
        });

        it( 'should return undefined if a nested property doesn\'t exist', function() {
            expect( field.getValue( object, 'c' ) ).to.be.undefined;
        });

        it( 'should return the value of a nested property', function() {
            expect( field.getValue( object, 'b.c' ) ).to.equal( object.b.c );
        });

        it( 'should return an array of plucked value if nested property is in array', function() {
            var expected = object.b.d.map(function( value ) {
                return value.e;
            });

            expect( field.getValue( object, 'b.d.e' ) ).to.eql( expected );
        });

        it( 'should allow nested access of an array property', function() {
            var expected = object.b.d.map(function( value ) {
                return value.f.g;
            });

            expect( field.getValue( object, 'b.d.f.g' ) ).to.eql( expected );
        });
    });
});
