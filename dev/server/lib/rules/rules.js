
var fs = require('fs') ;
var sys = require('sys') ;

exports.Rules = function() {
	this.json = null ;
} ;

exports.Rules.prototype = {
	
	/**
	 * chargement du fichier de règle
	 */
	load: function(filename) {
		var data = fs.readFileSync(filename) ;
		this.json = JSON.parse(data) ;
		for(var property in this.json.rules) {
			sys.log(" load --> rule : " + property) ;
		}
	},

	/**
	 * exécuter une action
	 */
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

	/**
	 * vérifie qu'une règle existe pour l'action
	 */
	hasRule: function(action) {

	}


	/**
	 * valide une règle
	 */
	validateRule: function(rule) {
		var valid = false ;
		for(cond in rule.if) {
			//valid = valid && eval(cond) ;
		}
		return valid ;
	}
	

	/**
	 * execute une action
	 */
	executeRule: function(rule) {
		for(exe in rule.do) {
			//eval(exe) ;
		}
	}

}



