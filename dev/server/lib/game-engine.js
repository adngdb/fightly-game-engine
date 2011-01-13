var WGE = function () {
    var components = {},
        entities = {},
        games = {};

    return {
        this.log = function(data) {
            sys.log("\033[0;32m"+data+"\033[0m");
        }

        this.init = function() {
            this.log("GameEngine: init()");
        }
    }
}();
