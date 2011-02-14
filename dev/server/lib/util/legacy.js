/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

exports.Legacy = function() {

}

exports.Legacy.prototype = {

   inherits : function(base, extension) {
        for (var property in base) {

            try {
                extension[property] = base[property];

            }catch( warning ){}
        }
   },
}
