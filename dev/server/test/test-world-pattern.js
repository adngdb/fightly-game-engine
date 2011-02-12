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
var legacy_ = require("../util/legacy.js")
var observer_ = require("../util/observer.js")
var subject_ = require("../util/subject.js")



var gf = new gameFactory_.GameFactory();
var pf = new playerFactory_.PlayerFactory();
var mf = new mapFactory_.MapFactory();
var cf = new cellFactory_.CellFactory();
var uf = new unitFactory_.UnitFactory();

gf.playerFactory = pf;
gf.mapFactory = mf;
mf.cellFactory = cf;
pf.unitFactory = uf;


exports["test-pattern"] = function(test) {

    var gm = gf.create(12);
    var un = uf.create("arché", "toto");
    var obj = new legacy_.Legacy();
    un.health = 100;

    obj.inherits(new subject_.Subject(), un);
    obj.inherits(new observer_.Observer(), gm);

    un.publishEvent = function(data) {
        console.log("published :  "+ data);
        this.notify(data);
    }

    gm.update = function(data){
        console.log("updated :  " + data );
        return data ;
    }

    un.addObserver(gm);
    un.publishEvent(un.health);

    test.done();

}
