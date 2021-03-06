/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define({
    inherit: function (a, b) {
        var fn = function () {};
        fn.prototype = b.prototype;
        a.prototype = new fn;
        a.prototype.constructor = a;
    },
});
