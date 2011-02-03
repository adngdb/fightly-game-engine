/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class ActionManager
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
ActionManager = function() {
};

ActionManager.prototype = {

    parse: function(message) {
        return JSON.parse(message);
    },

    manageMessage: function(message) {
        var data = this.parse(message);

        return this;
    },

};
