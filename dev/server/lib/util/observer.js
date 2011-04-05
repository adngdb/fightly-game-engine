/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util');

/**
 * Class Observer
 * Part of the observer pattern.
 *
 * @constructor
 */
function Observer() {

};

Observer.prototype = {

    update : function(context) {
        if (!this.onUpdate) {
            return;
        }
        return this.onUpdate(context);
    },

};

module.exports = Observer;
