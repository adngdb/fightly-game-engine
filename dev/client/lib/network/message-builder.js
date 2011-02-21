/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class MessageBuilder
 * Create messages to send to the server in a simple way.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr, Van-Duc Nguyen
 * @constructor
 */
MessageBuilder = function() {
};

MessageBuilder.prototype = {

    /**
     * Create the basic structure of a message, and stringify to JSON.
     * @param type Type of message. Can be "login", "query", "data" or "action".
     * @param data Object containing data of the message.
     * @return JSON message to send.
     */
    createMessage: function(type, data) {
        var msg = {
            type: type,
            data: data
        };

        return JSON.stringify(msg);
    },

    /**
     * Create a login message, and stringify to JSON.
     * @param login Username.
     * @param data Object containing other login data.
     * @return JSON message to send.
     */
    createLogin: function(login, data) {
        data.username = login;
        return this.createMessage('login', data);
    },

    /**
     * Create a query message, and stringify to JSON.
     * @param responseMethod Type of message we want to receive in response.
     * @param responseData Object containing data about this query.
     * @return JSON message to send.
     */
    createQuery: function(responseMethod, responseData) {
        var data = responseData;
        data.method = responseMethod;
        return this.createMessage("query", data);
    },

    /**
     * Create an action message, and stringify to JSON.
     * @param name Name of the action.
     * @param data Object containing data about this action.
     * @return JSON message to send.
     */
    createAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;
        return this.createMessage("action", actionData);
    },

    /**
     * Create a login message to authenticate on the server.
     * @param login Login of the user.
     * @param password Password of the user.
     * @return JSON message to send.
     */
    createAuthenticationLogin: function(login, password) {
        var data = {};
        if (password != null) {
            data.password = password;
        }
        return this.createLogin(login, data);
    },

    /**
     * Create an action message to join a game.
     * @param gameId Identifier of the game to join.
     * @return JSON message to send.
     */
    createJoinGameAction: function(gameId) {
        var data = {};
        data.game_id = gameId;
        return this.createAction("join-game", data);
    },

    /**
     * Create action message: move unit.
     * @param unitId Id of the unit which the player want to move.
     * @param to_X Target Absciss.
     * @param to_Y Target Ordinate.
     * @return JSON message to send.
     */
    createMoveUnitAction: function(unitId, toX, toY) {
        var data = {};
        data.unit_id = unitId;
    data.to_x = toX;
    data.to_y = toY;

        return this.createAction("move-unit", data);
    },

    /**
     * Create action message: attack unit.
     * @param AttackerId Id of the unit which is attacker.
     * @param VictimId Id of the unit which is attacked.
     * @return JSON message to send.
     */
    createAttackUnitAction: function(AttackerId, VictimId) {
        var data = {};
        data.attacker_id = AttackerId;
    data.victim_id = VictimId;

        return this.createAction("attack-unit", data);
    },

    /**
     * Create an action message: abandon.
     * @return JSON message to send.
     */
    createAbandonAction: function() {
        return this.createAction("abandon");
    },

    /**
     * Create an action message: end turn.
     * @return JSON message to send.
     */
    createEndTurnAction: function() {
        return this.createAction("end-turn");
    },

};
