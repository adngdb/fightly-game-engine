// Classe partie

function Partie(){

	this.nbOfPlayer=3;
	this.arrayOfPlayer=["qs","csz","csdc"];
	
}


Partie.prototype={
	affiche: function(tableau){
	   this.arrayOfPlayer=tableau;
	   for (var i=0;i<this.nbOfPlayer;i++){
			
		console.log("arrayOfPlayer["+ i+ "]=" + this.arrayOfPlayer[i]);
	   }
			
	}
}

// Classe joueur
function Player(){
	this.id = 1;
	this.tour = 2;

}

Player.prototype={
	setPlayer:function(){
		console.log("id joueur = "+this.id + "tour joueur" + this.tour);
		return this.id;	
	} 
	getPlayer : function(id,tour){
		this.id = id;
		this.tour=tour;
		console.log("id joueur = "+this.id + "tour joueur" + this.tour);
	}
}

var joueur = new Player();
joueur.setPlayer();
joueur.getPlayer("120","2");

var tableau = new Array;
tableau=["joueur1","joueur2","joueur3"];
var obj = new Partie();
obj.affiche(tableau);
