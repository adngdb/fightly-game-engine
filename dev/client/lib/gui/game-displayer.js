/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class GameDisplayer
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
function GameDisplayer(world, eventManager) {
    this.world = world;
    this.eventManager = eventManager;

    this.width = 800;
    this.height = 600;
    this.spriteSize = 64;

    this.mapSprite = './assets/images/map.png';
    this.unitSprite = './assets/images/unit.png';

    this.iso = Crafty.isometric.init(this.spriteSize);
};

GameDisplayer.prototype = {
    init: function() {
        var map = this.world.game.map;

        this.width = map.width * this.spriteSize + this.spriteSize / 2;
        this.height = map.height * this.spriteSize / 2;

        Crafty.init(50, this.width, this.height);

        this.createSprites();
    },

    createSprites: function() {
        // Map sprite
        Crafty.sprite(this.spriteSize, this.mapSprite, {
            plains:     [0, 0, 1, 1],
            swamp:      [1, 0, 1, 1],
            mountain:   [2, 0, 1, 1],
        });

        // Unit sprite
        Crafty.sprite(this.spriteSize, this.unitSprite, {
            unit: [0, 0, 1, 1],
        });
    },

    display: function() {
        this.displayMap()
            .displayUnits();
    },

    displayMap: function() {
        var map = this.world.game.map;
        var cellClickMap = function() { return new Crafty.polygon([32,16], [64,32], [32,48], [0,32]); };

        for (var y = 0; y < map.height; y++) {
        
            for (var x = 0; x < map.width; x++) {
                var cell = map.cells[x][y];
                var tile = Crafty.e('2D, DOM, clickable, ' + cell.type)
                    .clickable(cellClickMap(), function () { alert("Hallo, ich bin "+this.x+", "+this.y); });

                this.iso.place(x, y, 0, tile);
            }
        }
        return this;
    },
    
    // unitCallback : 
    unitCallback: function() {
    	var uSprite = this;
    	if(uSprite.alpha == 0.5){ uSprite.alpha = 1;  };
    	if(uSprite.alpha == 1  ){ uSprite.alpha = 0.5;};
    },

    displayUnits: function() {
        var players = this.world.game.players,
            i = 0,
            l = players.length;

        for (; i < l; i++) {
            var pl = players[i],
                units = pl.units;

            var j = 0,
                ul = units.length;

            for (; j < ul; j++) {
                var unit = units[j];
                var unitSprite = Crafty.e('2D, DOM, unit, clickable');
                    //.clickable(new Crafty.polygon([0,0],[24,0],[24,32],[0,32]), function () {this.alpha = 0.5;});
                    //.clickable(new Crafty.polygon([0,0],[24,0],[24,32],[0,32]), this.unitCallback);
                    //alert("unit.cell.x = "+unit);
                //this.iso.place(unit.cell.x, unit.cell.y, 1, unitSprite);
                this.iso.place(0, 2, 1, unitSprite);
            }
        }
    },

};
