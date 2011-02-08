/**
 * Gère les action
 * @param Game game instance de la partie
 */
exports.ActionManager = function(game) {
	this.game = game ;
}

exports.ActionManager.prototype = {

	/**
	 * Move a unit to a cell
	 * @param string unitId id of the unit
	 * @param int cellX X of the cell
	 * @param int cellY Y of the cell
	 * @return true if the action succeeded, false otherwise
	 */	
	moveUnit: function(unitId,cellX,cellY) {

		var unit = this.game.getUnit(unitId) ;
		var cell = this.game.map.getCell(cellX,cellY) ;
		if( this.game.map.getDistanceBetween(unit.cell, cell) <= unit.movement ) {
			unit.moveToCell(cell) ;
			//TODO modifier la valeur de déplacement en fonction de movement dans fichier de config
			//unit.movement -= this.rules.get(...) ...
			--unit.movement ;
			return true ;
		}

		return false ;
	},


	/**
	 * attack a targer with a unit
	 * @param string unitId id of the unit who attacks
	 * @param string targetId id of the target
	 * @return true if the action succeeded, false otherwise
	 */	
	attackUnit: function(unitId,targetId) {

		var unit = this.game.getUnit(unitId) ;
		var target = this.game.getUnit(targetId) ;

		//if the target is reachable
		if( this.game.map.getDistanceBetween(unit.cell, target.cell) <= unit.reach ) {

			//the unit attacks
			unit.attack(target) ;
			
			//riposte de la cible si à porter
			if( this.game.map.getDistanceBetween(target.cell, unit.cell) <= target.reach )
				target.attack(unit) ;

			return true ;
		}

		return false ;
	}

}
