exports.ActionManager = function() {}

//static methode
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

