/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

/**
 * Class GameEngine
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 */
GameEngine = function() {
    this.com = null;
    this.mb = null;
};

GameEngine.prototype = {

    init: function() {
        this.mb = new MessageBuilder();

        this.com = new ComManager(this);
        this.com.init();
        return this;
    },

    start: function() {
        return this;
    },

};

new GameEngine().init().start();
