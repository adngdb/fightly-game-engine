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

		//TODO

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



