var sys = require('sys') ;
var manager_ = require('lib/rules/action-manager.js') ;
var GameFactory_ = require('lib/world/game-factory.js') ;
var MapFactory_ = require('lib/world/map-factory.js') ;
var UnitFactory_ = require('lib/world/unit-factory.js') ;
var CellFactory_ = require('lib/world/cell-factory.js') ;

exports['moveUnit'] = function (test) {
	
	//créer une partie
	var gFac = new GameFactory_.GameFactory() ;
	var game = gFac.create('test') ;

	//créer une map
	var mFac = new MapFactory_.MapFactory() ;
	game.map = mFac.create(10,10) ;

	//créer une unité
	var uFac = new UnitFactory_.UnitFactory() ;
	var unit = uFac.create("foo","bar",null,null,10,10,1,1,null) ; //id,name,owner,type,attack,defense,view,move,properties

	//placer une unité sur une case
	var cFac = new CellFactory_.CellFactory() ;
	unit.cell = cFac.create(null,1,1) ;

	//placer une unité vers des coordonnées valide
	unit.moveToCoord(1,2) ; //alt : unit.moveToCell(cell) ;

	//vérifier que le coordonnée de l'unité on changer
	assert.equal(unit.cell.x,1,"x n'a pas changé") ;
	assert.equel(unit.cell.y,2,"y n'a pas changé") ;

	test.done() ;
}


exports['attackUnit'] = function (test) {

	test.done() ;
}

