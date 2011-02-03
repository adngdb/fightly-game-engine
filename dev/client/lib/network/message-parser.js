/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class MessageParser
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
MessageParser = function() {
};

MessageParser.prototype = {

    parse: function(message) {
        return JSON.parse(message);
    },

};
