var sys = require('sys') ;
var ActionManager_ = require('lib/rules/action-manager.js') ;
var GameFactory_ = require('lib/world/game-factory.js') ;
var MapFactory_ = require('lib/world/map-factory.js') ;
var UnitFactory_ = require('lib/world/unit-factory.js') ;
var CellFactory_ = require('lib/world/cell-factory.js') ;

exports['moveUnit'] = function (test) {
	
	//factory et manager
	var gFac = new GameFactory_.GameFactory() ;
	var mFac = new MapFactory_.MapFactory() ;
	var uFac = new UnitFactory_.UnitFactory() ;
	var cFac = new CellFactory_.CellFactory() ;
	var aMan = new ActionManager_.ActionManger() ;

	//créer une partie
	var game = gFac.create('test') ;

	//créer une map
	game.map = mFac.create(10,10) ;

	//créer une unité (id,name,owner,type,attack,defense,view,move,properties)
	var unit = uFac.create("foo","one",null,null,10,10,1,1,null) ;
	unit.cell = cFac.create(null,1,1) ;

	//déplacer l'unité
	aMan.moveUnit(unit.id,1,2) ;

	//vérifier que le coordonnée de l'unité ont changé
	assert.equal(unit.cell.x,1,"x n'a pas changé") ;
	assert.equel(unit.cell.y,2,"y n'a pas changé") ;

	test.done() ;
}


exports['attackUnit'] = function (test) {

	//factory et manager
	var gFac = new GameFactory_.GameFactory() ;
	var mFac = new MapFactory_.MapFactory() ;
	var uFac = new UnitFactory_.UnitFactory() ;
	var cFac = new CellFactory_.CellFactory() ;
	var aMan = new ActionManager_.ActionManager() ;

	//créer une partie
	var game = gFac.create('test') ;

	//créer une carte
	game.map = mFac.create(10,10) ;

	//créer deux unités
	var unit1 = uFac.create("foo","bar",null,null,10,10,1,1,null) ; //id,name,owner,type,attack,defense,view,move,properties
	var unit2 = uFac.create("foo","bar",null,null,10,10,1,1,null) ;

	//placer les unités sur une case
	unit1.cell = cFac.create(null,1,1) ;
	unit2.cell = cFac.create(null,1,2) ;

	//unit1 attaque unit2
	aMan.attackUnit(unit1.id,unit2.id) ;

	test.done() ;
}

