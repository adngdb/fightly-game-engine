// Classe joueur
function Player(){
	var id;
	var tour;

	this.getPlayerId=function(){
		//console.log("id joueur = "+this.id + "tour joueur" + this.tour);
		return this.id;	
	} 
	this.setPlayerId=function(par1){
		this.id = par1;
		//console.log("id joueur = "+this.id + "   tour joueur = " + this.tour);
	}
	
	this.getPlayerTour=function(){
		//console.log("id joueur = "+this.id + "tour joueur" + this.tour);
		return this.tour;	
	}
	this.setPlayerTour=function(par2){
		this.tour=par2;
		//console.log("id joueur = "+this.id + "   tour joueur = " + this.tour);
	}
	this.Players = function(par1,par2){
		this.id = par1;
		this.tour = par2;	
	} 
}

var player = new Array();
var joueur = new Player();
var abc = joueur.setPlayerId=(2323);


//tests
console.log("***** abc " + abc);
joueur.Players(1,2);

console.log("***** joueur id" + joueur.id);
console.log("***** joueur tour" + joueur.tour);

// Tableau des joueurs (Variable globale)
var player = new Array();

// Pseudo-fabrique des joueurs de la partie
PlayersFactory = function(nb){
	
	    for (i=0 ; i< nb ; i++){
		player[i] = new Player();
		player[i].setPlayerId(i);
		//console.log("---  player[" + i + "]= " + player[i].getPlayerId())
		player[i].setPlayerTour(0);
	    }
	
}
 // tests
PlayersFactory(3);
for (i=0 ; i< 3 ; i++){
console.log("---  " + player[i].getPlayerId()) ;}
