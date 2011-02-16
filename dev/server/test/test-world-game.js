/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var gameFactory_ = require("../lib/world/game-factory.js");
var playerFactory_ = require("../lib/world/player-factory.js");
var mapFactory_ = require("../lib/world/map-factory.js");
var cellFactory_ = require("../lib/world/cell-factory.js");
var unitFactory_ = require("../lib/world/unit-factory.js");
var user_ = require("../lib/user.js");
var observer_ = require("../lib/util/observer.js");

//var gm = new gameFactory_.GameFactory().create(12);

var gf = new gameFactory_.GameFactory(new observer_.Observer());
var pf = new playerFactory_.PlayerFactory();
var mf = new mapFactory_.MapFactory();
var cf = new cellFactory_.CellFactory();
var uf = new unitFactory_.UnitFactory();

gf.playerFactory = pf;
gf.mapFactory = mf;
mf.cellFactory = cf;
pf.unitFactory = uf;


exports["test-game-players"] = function(test) {

        var gm = gf.create(12);
        gm.players = ["toto","titi","tata"];
        test.equal(gm.players[0], "toto");
        test.done();
}


/*exports["test-game-toJSON"] = function(test) {

        var gm = gf.create(13);
        var str = "{" + "\"id\"" + ":-1,"+"\"players\"" + ":[]," + "\"map\""+ ":null}" ;
        test.equal(str, JSON.stringify(gm));
        test.done();
}*/


exports["test-game-getPlayersIds"] = function(test) {
        var user1 = new user_.User(3,"toto");
        var user2 = new user_.User(4,"titi");

    var game = gf.create(14);

        var pl1 = game.addPlayer(user1);
        var pl2 = game.addPlayer(user2);


        game.players[0] = pl1;
        game.players[1] = pl2;

        var tab = game.getPlayersIds();

        test.equal(tab[0],3);
        test.equal(tab[1],4);
        test.done();

}

exports["test-game-removePlayer"] = function(test) {

        var user1 = new user_.User(3,"toto");
        var user2 = new user_.User(4,"titi");
        var user2 = new user_.User(5,"titiyyy");

		var game = gf.create(14);

        var pl1 = game.addPlayer(user1);
        var pl2 = game.addPlayer(user2);

		game.removePlayer(4);		
		
		test.equal(game.players[1].id , 5);
		test.done();
}

exports["test-game-startPlaying"] = function(test) {

        var user1 = new user_.User(3,"toto");
        var user2 = new user_.User(4,"titi");
        var user3 = new user_.User(5,"titiyyy");

		var game = gf.create(14);

        var pl1 = game.addPlayer(user1);
        var pl2 = game.addPlayer(user2);
        var pl3 = game.addPlayer(user3);
		pl1.turn = 0;
		pl2.turn = 1;
		pl3.turn = 2;
		var currentTurn = 0;
		
		game.startPlaying();
		test.equal(game.currentPlayer.turn , currentTurn);		    
		
		var startInterval = setInterval(function() {		    
		    currentTurn++;
		    if(currentTurn > 2)
				currentTurn = 0;
			if(!game.currentPlayer) {
				test.done();
		    } else {			
		        test.equal(game.currentPlayer.turn , currentTurn);
		        console.log("Round: " + game.nbPlayedTurns);
			}		    
		}, game.turnDuration * 1000);
		
		
		var stopInterval = setInterval(function() {		    
		    test.done();
		    clearInterval(startInterval);
		    clearInterval(stopInterval);
		}, 100000);
		
}
