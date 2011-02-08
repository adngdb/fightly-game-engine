var unit_ = require("../lib/world/unit.js");
var player_ = require("../lib/world/player.js");


exports["test-unit-toJSON"] = function (test) {

        var st = new unit_.Unit();
        st.owner = new player_.Player(); // RMQ (ilyas) Pourquoi tu met un objet Player dans "owner" alors qu'on a besoin seulement de l'Id ou le nom du plyer ; st.owner = new player_.Player().id c'est mieu non ?!!

        var str = "{" + "\"id\"" + ":-1,"+"\"name\""+":null,"+ "\"owner\""+":-1," +"\"type\""+":null,"+"\"attack\""+":null,"+"\"defense\""+":null,"+"\"view\""+":null,"+"\"move\""+":null,"+"\"properties\""+":[]}" ;
        test.equal(str,st.toJSON());
        test.done();
}

exports["test-unit-removeProperty"] = function (test) {

        var un = new unit_.Unit();
        un.properties = ["a","b","c"];
        var prop = un.removeProperty("c");
        test.equal("a,b", prop.properties);

        var un = new unit_.Unit();
        un.properties = ["a","b","c"];
        var prop = un.removeProperty("b");
        test.equal("a,c", prop.properties);
        test.done();
}

exports["test-unit-addProperty"] = function (test) {

        var un = new unit_.Unit();
        un.properties = ["a","b"];
        un.addProperty("c");
        test.equal("a,b,c" , un.properties);
        test.done();

}

exports["test-unit-addProperty"] = function (test) {

        var un = new unit_.Unit();
        un.properties = ["a","b"];
        un.addProperty("c");
        test.equal("a,b,c" , un.properties);
        test.done();

}

exports["test-unit-hasProperty"] = function (test) {

        var un = new unit_.Unit();
        un.properties = ["a","b","c"];
        test.equal(true , un.hasProperty("b"));
        test.equal(false , un.hasProperty("d"));
        test.done();

}
