/**
 * Gère les action
 * @param Game game instance de la partie
 */
exports.ActionManager = function(game) {
	this.game = game ;
}

exports.ActionManager.prototype = {

	/**
	 * déplacer une unité sur une case
	 * @param string unitId identifiant de l'unité
	 * @param int cellX coordonnée x de la case
	 * @param int cellY coordonnée y de la case
	 * @return true si l'action à réussit, false sinon
	 */	
	moveUnit: function(playerId,unitId,cellX,cellY) {

		var unit = this.game.getUnit(unitId) ;
		var cell = this.game.map.getCell(cellX,cellY) ;

		if( !this.canPlay(playerId) )
			return false ;

		if( this.game.map.getDistanceBetween(unit.cell, cell) > unit.movement )
			return false ;

		unit.moveToCell(cell) ;
		return true ;
	},


	/**
	 * attaquer une cible avec une unité
	 * @param string unitId identifiant de l'unité
	 * @param string targetId identifiant de la cible
	 * @return true si l'action à réussit, false sinon
	 */	
	attackUnit: function(playerId,unitId,targetId) {

		var unit = this.game.getUnit(unitId) ;
		var target = this.game.getUnit(targetId) ;

		if( !this.canPlay(playerId) )
			return false ;
		
		if( this.game.map.getDistanceBetween(unit.cell, target.cell) > unit.reach )
			return false ;

		//l'unité attaque
		unit.attack(target) ;
		
		//riposte de la cible si à porter
		if( this.game.map.getDistanceBetween(target.cell, unit.cell) <= target.reach )
			target.attack(unit) ;

		return true ;
	},


	/**
	 * vérifie que le joueur peut jouer ?
	 * que c'est sont tour, etc
	 */
	canPlay: function(playerId) {

		var player = this.game.getPlayer(playerId) ;

	}

}
