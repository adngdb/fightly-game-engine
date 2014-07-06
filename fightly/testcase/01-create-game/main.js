requirejs.config({
    baseUrl: '../../client/src',
    paths: {
        'lib': '../lib',
        'config': '../config',
        'vendor': '../../vendor'
    },
});

require(['fightly', 'config/config'], function (Fightly, config) {
    var F = new Fightly(config);

    function showGames(games) {
        $('#games-list').empty();
        for (var i = games.length - 1; i >= 0; i--) {
            var game = games[i];
            if (game) {
                $('#games-list').append(
                    $('<li>')
                        .append($('<span>', {text: game.id}))
                        .append($('<span>', {text: game.players}))
                        .append($('<button>', {text: 'Join', id: game.id})
                            .data('game-id', game.id)
                            .click(function (e) {
                                F.actions.core.joinGame($(this).data('game-id'));
                            })
                        )
                );
            }
        }
    }

    F.on('ready', function () {
        $('body').append($('<button>', {text: 'New Game'}).click(function (e) {
            F.actions.core.createGame();
        }));

        // show all games
        showGames(F.games);

        F.on('gameJoined', function () {
            F.refreshGames();
        });

        F.on('gamesUpdated', function () {
            showGames(F.games);
        });
    });
});
