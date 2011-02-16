/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util');

exports.Observer = function() {

};

exports.Observer.prototype = {

    update : function(context) {
        return this.onUpdate(context);
    },

};
