/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 **********************************************************************/

var config = require('config');

var network = require('./lib/network/com-manager'),
    GameEngine = require('./lib/game-engine');

var engine = new GameEngine(config),
    server = new network.ComManager(config, engine);

engine.init();
server.listen(config.server.port);
