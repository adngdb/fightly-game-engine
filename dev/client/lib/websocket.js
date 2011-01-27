
window.onload = function() {
    if (!window.WebSocket)
        alert('Votre navigateur ne supporte pas les web sockets');
    else
    {
        client.load();
	document.getElementById("idLogIn").onclick = logIn;
	document.getElementById("idLogOut").onclick = logOut;	
	document.getElementById("idPlay").onclick = doSomething;	
    }
}

var socket;
client = {
    _ws: null,
    load: function() {
        var location = 'ws://localhost:3400';
        this._ws = new WebSocket(location);
	socket = this._ws;
        this._ws.onopen = this._onopen;
        this._ws.onmessage = this._onmessage;
        this._ws.onclose = this._onclose;
    },

    _onopen: function() {
        alert('Socket ouvert !');
    },
    _onclose: function() {
        alert('Socket fermé !');
        this._ws = null;
    },
    _onmessage: function(m) {
        alert(m.data);
    }

    /*		
    sendMessage() {
	//get a JSONText just for example
        var JSONObject = { 'action' : 'login', 
			   'params' : {'name' : 'aduc', 'pass' : ''}
			 };
	var JSONText = JSON.stringify(JSONObject);
	this.send(JSONText);	
	alert(JSONText);
    }
    */   
  
}

function logIn(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'login', 
			   'params' : {'name' : 'aduc', 'pass' : ''}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);
}

function logOut(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'logout', 
			   'params' : {'name' : 'aduc', 'pass' : ''}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);
}

function doSomething(){
	//get a JSONText just for example
        var JSONObject = { 'action' : 'move', 
			   'params' : {'direction' : 'left', 'distance' : '2'}
			 };
	
	var JSONText = JSON.stringify(JSONObject);
	sendMessage(JSONText);

}
function sendMessage(JSONText) {
	
	client._ws.send(JSONText);
}   
