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
MessageParser = function(ge) {
    this.ge = ge;   // GameEngine
};

MessageParser.prototype = {

    parse: function(message) {
        var obj = JSON.parse(message);
        switch (obj.type) {
            case "query":
                this.parseQuery(obj.data);
                break;
            case "action":
                this.parseAction(obj.data);
                break;
            case "data":
                this.parseData(obj.data);
                break;
            default:
                throw "Unknown message type"; // TODO: using an object of type Exception
        }
        return this;
    },

    parseQuery: function(data) {
        switch (data.response_type) {
            case "login":
                this.ge.onAuthenticationQuery();
                break;
        }
        return this;
    },

    parseAction: function(data) {
        return this;
    },

    parseData: function(data) {
        return this;
    },

};
