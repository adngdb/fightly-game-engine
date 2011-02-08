/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var game_ = require("../lib/world/game.js");
var playerFactory_ = require("../lib/world/player-factory.js");


exports["test-game-players"] = function(test) {

        var gm = new game_.Game();
        gm.players = ["toto","titi","tata"];
        test.equal(gm.players[0], "toto");
        test.done();
}


exports["test-game-toJSON"] = function(test) {

        var gm = new game_.Game();
        var str = "{" + "\"id\"" + ":-1,"+"\"players\"" + ":[]," + "\"map\""+ ":null}" ;
        test.equal(str,JSON.stringify(gm.toJSON()));
        test.done();
}

exports["test-game-getPlayersIds"] = function(test) {

        var pf = new playerFactory_.PlayerFactory();
        var pl1 = pf.create(1,"toto");
        var pl2 = pf.create(2,"titi");
        var gm = new game_.Game();

        gm.players[0] = pl1;
        gm.players[1] = pl2;

        var tab = gm.getPlayersIds();

        test.equal(tab[0],1);
        test.equal(tab[1],2);
        test.done();

}

