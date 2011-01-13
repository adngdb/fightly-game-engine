// Classe partie

function Partie(){

	var nbOfPlayers=3;
	var arrayOfPlayers= new Array();

	this.setPlayers = function(tableau){
		for (i=0; i<tableau.length ; i++)	   
		arrayOfPlayers [i]= tableau[i];
			
	}
	this.getPlayers = function(){
		return arrayOfPlayers;
	}

	this.getNbOfPlayers = function(){
		return nbOfPlayers;
	}

	this.setNbOfPlayers = function(nbP){
		this.nbOfPlayers=nbP;
	}
	
}

var tableau = new Array();
tableau=["joueur1","joueur2","joueur3"];
var obj = new Partie();
var nbjoueur = obj.getNbOfPlayers();

console.log("-------- nb de joueurs = "+ nbjoueur);
obj.setPlayers(tableau);
var tableau1 = new Array();
 tableau1 =  obj.getPlayers();
console.log("----------- "+ obj.getPlayers().length)
for (var i=0; i < nbjoueur ; i++){			
	console.log("arrayOfPlayers["+ i+ "]= " + obj.getPlayers()[i]);
}
