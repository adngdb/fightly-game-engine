exports.ActionManager = function() { 
    
};

exports.ActionManager.prototype = {

    parseMessage : function(msg){
        return JSON.parse(msg);
    },
    
    manageMessage : function(connection, msg) {
    	var objectJSON = this.parseMessage(msg);

    	if(objectJSON.action == "login") {
	    //create a new player whose username is objectJSON.params.name
	    connection.send("Hi " + objectJSON.params.name);
    	}
	else if(objectJSON.action == "logout") {
	    //closed connection
	    connection.send("Goodbye " + objectJSON.params.name);
	    //connection.close();
    	}
    	else {
	    //play game: move,...
	    this.playGame(connection, objectJSON);
    	}
    },
    
    playGame : function(conn, objectJSON) {

    	//check action with rule base

    	//excute action (return JSON message)
    	console.log(conn.sessionId + " play: " + objectJSON.action + " "
        		+ objectJSON.params.direction + " "
	        	+ objectJSON.params.distance + "cells");
    },


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
        createQuery("login"); 
    },    

    createConfirmationData: function(object_data){
	createData("new", "player", object_data);
    },
    
    createJoinAction: function(){
	createAction();
    },

    createPartieData: function(object_data){
	createData("new", "game", object_data);
    },

}

/*
exports.ActionManager.parseMessage = function(msg){
    return JSON.parse(msg);
}

exports.ActionManager.manageMessage = function(connection, msg) {
    var objectJSON = exports.ActionManager.parseMessage(msg);

    if(objectJSON.action == "login") {
        //create a new player whose username is objectJSON.params.name
	connection.send("Hi " + objectJSON.params.name);
    }
    else if(objectJSON.action == "logout") {
        //closed connection
        connection.send("Goodbye " + objectJSON.params.name);
        //connection.close();
    }
    else {
        //play game: move,...
        exports.ActionManager.playGame(connection, objectJSON);
    }
}


exports.ActionManager.playGame = function(conn, objectJSON) {    

    //check action with rule base

    //excute action (return JSON message)
    console.log(conn.sessionId + " play: " + objectJSON.action + " "
        + objectJSON.params.direction + " "
        + objectJSON.params.distance + "cells");
}


exports.ActionManager.moveLeft = function() {

}

exports.ActionManager.moveRight = function() {

}

exports.ActionManager.moveUp = function() {

}

exports.ActionManager.moveDown = function() {

}
*/
