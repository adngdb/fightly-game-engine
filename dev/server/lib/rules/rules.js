/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *
 **********************************************************************/


var fs = require('fs') ;
var sys = require('sys') ;


/**
 * Manage the rules
 * @author Maxime COLIN
 * @param Instance of the GameEngine
 */
exports.Rules = function(gameEngine) {
	this.json = null ;
	this.gameEngine = gameEngine ;
} ;

exports.Rules.prototype = {
	
	/**
	 * loading of the rules file
	 * @return this
	 */
	load: function(filename) {
		var data = fs.readFileSync(filename) ;
		this.json = JSON.parse(data) ;
		for(var property in this.json.rules) {
			sys.log(" load --> rule : " + property) ;
		}
		return this ;
	},


	/**
	 * configure the factories
	 */
	configureFactories: function() {
	
		//game-factory : set the game configuration
		this.gameEngine.gameFactory.setConfig(
			this.json.game.nbMaxPlayer,
			this.json.game.nbMaxTurns,
			this.json.game.turnDuration
		) ;

		//unit-factory : add the unit type
		for(unit in this.json.units) {
			this.gameEngine.unitFactory.addUnitType.(unit,unit.health,unit.attack,unit.defense,
						unit.view,unit.movement,unit.range,unit.properties) ;
		}

		//map-factory : nothing to do

		//cell-factory : nothing to do

		//player-factory : nothing to do


	}


/*
,

	execute: function(action) {
		
		//pour chaque règle
		for(var rule in this.json.rules) {
			
			//si elle correspond à notre action
			if(rule == action) {

				if( this.validateRule(rule) ) {
					this.executeRule(rule) ;
					return true ;
				}

			}
		}

		return false ;
		
	}

	hasRule: function(action) {

	}

	validateRule: function(rule) {
		var valid = false ;
		for(cond in rule.if) {
			//valid = valid && eval(cond) ;
		}
		return valid ;
	}

	executeRule: function(rule) {
		for(exe in rule.do) {
			//eval(exe) ;
		}
	},

*/



}



