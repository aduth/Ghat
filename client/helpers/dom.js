/**
 * Given an DOM element and selector string, returns the DOM element if it
 * matches the selector string, otherwise returns the most immediate ancestor
 * element which matches the selector.
 *
 * @param  {object} el       A DOM element
 * @param  {string} selector A selector string to match
 * @return {object}          The DOM element or closest ancestor which matches
 *                           the selector string
 */
module.exports.closest = function( el, selector ) {
    if ( 'closest' in Element.prototype ) {
        return el.closest( selector );
    } else {
        while ( el && el instanceof Element && ! el.matches( selector ) ) {
            el = el.parentNode;
        }

        if ( el && el instanceof Element && el.matches( selector ) ) {
            return el;
        }
    }
};
