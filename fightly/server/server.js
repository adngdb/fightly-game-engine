/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 **********************************************************************/

var config = require('config');

var network = require('./src/network/com-manager'),
    GameEngine = require('./src/game-engine');

var engine = new GameEngine(config),
    server = new network.ComManager(engine);

engine.init();
server.listen(config.server.port);
