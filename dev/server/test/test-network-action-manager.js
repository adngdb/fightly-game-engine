var actionManager_ = require("../lib/network/action-manager.js");

exports["test-parse-message"] = function (test) {
	var msg = "{\"action\": { \"name\": \"login\",\"params\": { \"arg1\": \"valeur1\"}}}";
	var objectJSON = actionManager_.ActionManager.parseMessage(msg);
        test.equal(objectJSON.action.name,"login");
        test.done();
}


exports["test-move-left"] = function (test) {
        test.done();
}

exports["test-move-right"] = function (test) {
        test.done();
}

exports["test-move-up"] = function (test) {
        test.done();
}

exports["test-move-down"] = function (test) {
        test.done();
}



