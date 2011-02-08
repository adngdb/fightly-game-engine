/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var util = require('util');

/**
 * Class GameDisplayer
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
function GameDisplayer(world) {
    this.world = world;

    this.width = 800;
    this.height = 600;
    this.spriteSize = 64;

    this.mapSprite = 'assets/images/map.png';

    this.iso = Crafty.isometric.init(spriteSize);
};

GameDisplayer.prototype = {
    init: function() {
        Crafty.init(50, this.width, this.height);
    },

    createSprites: function() {
        Crafty.sprite(this.spriteSize, {
            grass1: [0, 0, 1, 1],
            grass2: [1, 0, 1, 1],
            grass3: [2, 0, 1, 1],
            grass4: [3, 0, 1, 1],
        });
    },

    display: function() {

        for (var y = 0; y < this.height / this.spriteSize * 3; y++) {
            for (var x = 0; x < this.width / this.spriteSize - 1; x++) {
                var tile = Crafty.e('2D, DOM, grass1, mouse')
                    .areaMap([32,16], [64,32], [32,48], [0,32])
                    .bind("click", function() {
                        this.destroy();
                    });
                this.iso.place(x, y, 0, tile);
            }
        }

    },
};
