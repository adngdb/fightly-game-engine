/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util');

/**
 * Class MessageParser
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
exports.MessageParser = function(ge) {
    this.gameEngine = ge; // GameEngine
};

exports.MessageParser.prototype = {

    parse: function(message, clientId) {
        var obj = JSON.parse(message);
        util.log('MessageParser.parse');

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
        this.gameEngine.onLogin(data.username, clientId);
        return this;
    },

    parseAction: function(action, clientId) {
        switch (action.name) {
            case "join-game":
                this.gameEngine.onJoinGame(action.data.game_id, clientId);
                break;
	    case "move-unit":
		this.gameEngine.onMoveUnit(action.data.unit_id, action.data.to_x, action.data.to_y, clientId);
		break;
	    case "attack-unit":
		this.gameEngine.onAttackUnit(action.data.attacker_id, action.data.victim_id, clientId);
		break;
	    case "abandon":
		this.gameEngine.onAbandon(clientId);
		break;
	    case "end-turn":
		this.gameEngine.onEndTurn(clientId);
		break;
        }
        return this;
    },

    parseData: function(data, clientId) {
        return this;
    },

};
