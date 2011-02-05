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
exports.MessageParser = function(ge) {
    this.ge = ge; // GameEngine
};

exports.MessageParser.prototype = {

    parse: function(message, clientId) {
        var obj = JSON.parse(message);
        switch (obj.type) {
            case "query":
                this.parseQuery(obj.data, clientId);
                break;
            case "login":
                this.parseLogin(obj.data, clientId);
                break;
            case "action":
                this.parseAction(obj.data, clientId);
                break;
            case "data":
                this.parseData(obj.data, clientId);
                break;
            default:
                throw "Unknown message type"; // TODO: using an object of type Exception
        }
        return this;
    },

    parseQuery: function(data, clientId) {
        return this;
    },

    parseLogin: function(data, clientId) {
        return this;
    },

    parseAction: function(data, clientId) {
        return this;
    },

    parseData: function(data, clientId) {
        return this;
    },

};
