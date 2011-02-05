/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var messageParser_ = require("../lib/network/message-parser.js");

exports["test-parse-message"] = function (test) {
    var messageParser = new messageParser_.MessageParser();

    //var msg = "{\"action\": { \"name\": \"login\",\"params\": { \"arg1\": \"valeur1\"}}}";
    //~ var msg = '{"type":"login","data":{"username":"player"}}';
    //~ var res = messageParser.parse(msg);
//~
    //~ test.equal(res.type, "login");
    //~ test.equal(res.data.username, "player");

    test.done();
}
