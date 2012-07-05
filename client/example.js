$(document).ready(function() {
    $('#end-turn').click(function(e) {
        FIGHTLY.game.endTurn();
    });
    $('.join-game').click(function(e) {
        var game = this.id;
        FIGHTLY.game.join(game);
    });

    var units = FIGHTLY.get('Unit');
    for (var i in units) {
        var unit = units[i];

        myOwnEngine.displayUnit(unit.x, unit.y, unit.life);
    }
});
