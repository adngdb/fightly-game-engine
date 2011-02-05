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
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
MessageBuilder = function() {
};

MessageBuilder.prototype = {

    createMessage: function(method, data) {
        var msg = {
            type: method,
            data: data
        };

        return JSON.stringify(msg);
    },

    createLogin: function(login, data) {
        data.username = login;
        return this.createMessage('login', data);
    },

    createQuery: function(responseMethod, responseData) {
        var data = responseData;
        data.method = responseMethod;
        return this.createMessage("query", data);
    },

    createAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;
        return this.createMessage("action", actionData);
    },

    createData: function(method, object, object_data) {
        var data = {};
        data.method = method;
        data.object = object;
        data.object_data = object_data;
        return this.createMessage("data", data);
    },

    createAuthenticationLogin: function(login, password) {
        var data = {};
        if (password != null) {
            data.password = password;
        }
        return this.createLogin(login, data);
    },

};
