// Classe joueur
function Player(){
	this.id = 1;
	this.tour = 2;
	this.setPlayer=function(){
		console.log("id joueur = "+this.id + "tour joueur" + this.tour);
		return this.id;	
	} 
	this.getPlayer=function(par1,par2){
		this.id = par1;
		this.tour=par2;
		console.log("id joueur = "+this.id + "   tour joueur = " + this.tour);
	}
}


var joueur = new Player();
joueur.setPlayer();
joueur.getPlayer(22,23);
