var expect = require( 'chai' ).expect,
    jsdom = require( 'jsdom' ),
    DOM = require( '../../../client/helpers/dom' );

describe( 'DOM', function() {
    var anchor, icon;

    before(function( done ) {
        jsdom.env( '<html><body></body></html>', function( error, window ) {
            global.window = window;
            global.document = window.document;
            global.Element = window.Element;

            anchor = document.createElement( 'a' );
            document.body.appendChild( anchor );

            icon = document.createElement( 'span' );
            anchor.appendChild( icon );

            done( error );
        });
    });

    describe( '#closest()', function() {
        it( 'should match the element itself if matching selector', function() {
            expect( DOM.closest( icon, 'span' ) ).to.equal( icon );
        });

        it( 'should find the closest ancestor with matching selector', function() {
            expect( DOM.closest( icon, 'a' ) ).to.equal( anchor );
        });

        it( 'should return undefined if no ancestor matches selector', function() {
            expect( DOM.closest( icon, 'div' ) ).to.be.undefined;
        });
    });
});
