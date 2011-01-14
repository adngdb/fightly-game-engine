var am = require("./action-manager");

exports.Communication = function() {}

//static methode 
exports.Communication.manageMessage = function(conn, server, msg) {
    var objectJSON = JSON.parse(msg);
    console.log(objectJSON.action);
    
    if(objectJSON.action == "login") {
	//create a new player whose username is objectJSON.params.name
	server.broadcast("Hi " + objectJSON.params.name);
    }    
    else if(objectJSON.action == "logout") {	
	//closed connection
	server.send(conn.id, "Goodbye " + objectJSON.params.name);
	conn.close();
    }
    else {
	//play game: move,...
	am.ActionManager.playGame(conn, server, msg);
    }

}
