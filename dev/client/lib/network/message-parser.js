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
    this.gameEngine = ge;   // GameEngine
};

MessageParser.prototype = {

    parse: function(message) {
        var obj = JSON.parse(message);
        log('MessageParser.parse: '+obj);

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
        log('MessageParser.parseQuery: '+data);

        switch (data.response_type) {
            case "login":
                this.gameEngine.onAuthenticationQuery();
                break;
        }
        return this;
    },

    parseAction: function(data) {
        return this;
    },

    parseData: function(data) {
        switch (data.method) {
            case "new":
                this.parseNewData(data.object, data.object_data);
                break;
            case "update":
                this.parseUpdateData(data.object, data.object_data);
                break;
            case "delete":
                this.parseDeleteData(data.object, data.object_data);
                break;
        }
        return this;
    },

    parseNewData: function(object, data) {
        if (object == "Authentication") {
            this.gameEngine.onAuthenticationConfirm(data.username, data.valid);
        }
        return this;
    },

    parseUpdateData: function(object, data) {
        return this;
    },

    parseDeleteData: function(object, data) {
        return this;
    },

};
