var cell_ = require("../lib/world/cell.js");

exports["test-new-cell"] = function (test) {
        var c = new cell_.Cell();
        test.equal(c.x, -1);
        test.equal(c.y, -1);
        test.done();
}


exports["test-new-cell-toJSON"] = function (test) {

        var st = new cell_.Cell();
        var str = "{" + "\"type\"" + ":null,"+"\"x\""+":-1,"+"\"y\""+":-1}" ;
        test.equal(str,st.toJSON());
        test.done();
}
