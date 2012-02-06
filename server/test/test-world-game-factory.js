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
var unitFactory_ = require("../lib/world/unit-factory.js");
var mapFactory_ = require("../lib/world/map-factory.js");
var cellFactory_ = require("../lib/world/cell-factory.js");




/*exports["test-world-game-factory-create"] = function(test) {
        var gameFactory = new gameFactory_.GameFactory();
        gameFactory.playerFactory = new playerFactory_.PlayerFactory();
        gameFactory.mapFactory = new mapFactory_.MapFactory();
        gameFactory.cellFactory = new cellFactory_.CellFactory();
        gameFactory.unitFactory = new unitFactory_.UnitFactory();

        var createdGame = new gameFactory.create(123);
        test.equal(createdGame.id,123);
        test.done();
}*/

