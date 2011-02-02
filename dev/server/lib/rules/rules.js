
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

		fs.readFile(
			filename, 
			function (err, data) {
				if (err) { sys.log('erreur') ; throw err ; }
					this.json = JSON.parse(data) ;
					sys.log(typeof this.json) ;

					for(var property in this.json.rules) {
						sys.log("Création de la règle : "+property) ;
					}

			}.bind(this)
		);

	},


	

	/**
	 * exécuter une action
	 */
	execute: function(action,params) {

		for(var rules in this.json.rules) {
			
		}

		if(params == null)
			sys.log("no params") ;

		sys.log(action) ;

	}

}



