/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class Legacy
 *
 * @constructor
 */
function Legacy() {

}

Legacy.prototype = {

    inherits : function(base, extension) {
        for (var property in base) {

            try {
                extension[property] = base[property];

            }catch( warning ){}
        }
   },
};

module.exports = Legacy;
