$(document).ready(function() {
    Crafty.init(50, 608, 384);
    Crafty.canvas();

    Crafty.sprite(64, "images/grass_and_water.png", {
        grass1: [0, 0, 1, 1],
        grass2: [1, 0, 1, 1],
        grass3: [2, 0, 1, 1],
        grass4: [3, 0, 1, 1],
    });

    Crafty.sprite(128, "images/minotaur.png", {
        mino_left: [0, 0, 1, 1],
    });
	
    //build the map
	var cellClickMap = new Crafty.polygon([32,16], [64,32], [32,48], [0,32]);
    for (var j = -1; j < 22; j++)
    {
        for (var i = 0; i < 9; i++)
        {
            var x = i * 64 + ( (j % 2) * 32),
                y = j * 16;
				
            var tile = Crafty.e();
            var grass = "grass" + ( ( Math.floor(Math.random() * 4 ) ) + 1 );
            //alert(grass);
            tile.addComponent("2D, DOM, clickable, " + grass); // ---------
            tile.attr({x: x, y: y, w: 64, h: 64})
				.clickable(cellClickMap, function () { alert("coucou"); });
        }
    }

    var mino = Crafty.e("2D, DOM, mino_left, controls, fourway, mouse")
        .attr({x: Crafty.viewport.width / 2 - 64, y: Crafty.viewport.height / 2 - 64, w: 128, h: 128})
        .fourway(2)
        .areaMap([0,0],[128,0],[128,128],[0,128]) // delimitation de la cellule (case reélle)
        .bind("mousedown", function() { alert("ICH BIN EIN MINOTAUR !"); });
});
