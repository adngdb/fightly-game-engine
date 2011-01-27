exports.ActionManager = function() { };

exports.ActionManager.server = null;

exports.ActionManager.parseMessage = function(msg){
    return JSON.parse(msg);
}

exports.ActionManager.manageMessage = function(connection, server, msg) {
    var objectJSON = exports.ActionManager.parseMessage(msg);

    if(objectJSON.action == "login") {
        //create a new player whose username is objectJSON.params.name
	exports.ActionManager.server.broadcast("Hi " + objectJSON.params.name);
    }
    else if(objectJSON.action == "logout") {
        //closed connection
        exports.ActionManager.server.send(connection.id, "Goodbye " + objectJSON.params.name);
        connection.close();
    }
    else {
        //play game: move,...
        exports.ActionManager.playGame(connection, server, objectJSON);
    }
}


exports.ActionManager.playGame = function(conn, server, objectJSON) {    

    //check action with rule base

    //excute action (return JSON message)
    console.log(conn.id + " play: " + objectJSON.action + " "
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

