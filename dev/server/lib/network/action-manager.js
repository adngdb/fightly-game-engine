exports.ActionManager = function() {}

//static methode
exports.ActionManager.manageMessage = function(connection, server, msg) {
    var objectJSON = JSON.parse(msg);
    console.log(objectJSON.action);
    
    if(objectJSON.action == "login") {
	//create a new player whose username is objectJSON.params.name
	server.broadcast("Hi " + objectJSON.params.name);
    }    
    else if(objectJSON.action == "logout") {	
	//closed connection
	server.send(connection.id, "Goodbye " + objectJSON.params.name);
	conn.close();
    }
    else {
	//play game: move,...
	exports.ActionManager.playGame(connection, server, msg);
    }

}


exports.ActionManager.playGame = function(conn, server, msg) {
    //read the message and parse it to JSON object
    var objectJSON = JSON.parse(msg);

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

