exports.ActionManager = function() {

};

exports.ActionManager.prototype = {

    /**
     *
     *   Base functions to send message (Server -> Client)
     */
    createMessage: function(method, data) {
        var msg = {
            type: method,
            data: data
        };

        return JSON.stringify(msg);
    },

    createQuery: function(responseType, responseData) {
        var data = {};
        data.response_type = responseType;
    data.data = responseData;

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

    /**
     *
     *   Authentification
     */

    createAuthentificationQuery: function() {
        this.createQuery("login");
    },

    createConfirmationData: function(object_data){
        this.createData("new", "Player", object_data);
    },

    createJoinAction: function(){
        this.createAction();
    },

    createGameData: function(object_data){
        this.createData("new", "Game", object_data);
    },

}
