/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 **********************************************************************/

var network = require('./lib/network/com-manager.js')
    , server = new network.ComManager();

server.listen(8081);
