requirejs.config({
    baseUrl: '../../client/src',
    paths: {
        'lib': '../lib',
        'config': '../config',
        'vendor': '../../vendor',
        'socketio': 'http://localhost:8091/socket.io/socket.io'
    },
});

require(['fightly', 'config/config'], function (Fightly, config) {
    let F = new Fightly(config);

    function showStage(stage) {
        $('section').hide();
        $('#' + stage).show();
    }
    showStage('loading');

    F.on('ready', () => {
        showStage('start');

        F.on('gameJoined', () => {
            console.log(F.identity);
            showStage('waiting');
        });

        F.on('gameStarted', () => {
            showStage('game');
        });

        F.on('gameEnded', () => {
            showStage('start');
        });
    });

    $('#start button').click((e) => {
        e.preventDefault();

        if (!F.games.length) {
            // No games, create one.
            console.log('Asked for new game');
            F.actions.core.createGame();
        }
        else {
            console.log('Joining existing game');
            F.actions.core.joinGame(F.games[0].id);
        }
    });

    $('#game').on('click', '.cell', (e) => {
        var id = $(this).attr('id').split('-');
        F.actions.tictactoe.playOnCell(id[1], id[2]);
    });

    const Board = {
        name: 'Board',
        state: {
            board: [
                [-1, -1, -1 ],
                [-1, -1, -1 ],
                [-1, -1, -1 ],
            ],
        }
    }

    var actions = {
        playOnCell: {
            check: function (playerId, i, j) {
                var state = this.getComponentsData('Board')[0];
                var player = this.getComponentDataForEntity('Player', playerId);
                return (
                    state.activePlayer === player.number &&
                    state.board[i][j] === -1
                );
            },
            execute: function (playerId, i, j) {
                var state = this.getComponentsData('Board')[0];
                var game = this.getComponentsData('Game')[0];
                state.board[i][j] = game.activePlayer;
                this.actions.core.nextTurn();
                // state.activePlayer = Math.abs(state.activePlayer - 1);
            }
        }
    }

    var GameProcessor = function (manager) {
        this.manager = manager;
    };

    GameProcessor.prototype.update = function (dt) {
        let state = this.manager.getComponentsData('Board')[0];
        let game = this.manager.getComponentsData('Game')[0];

        // Update cells.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = $('#cell-' + i + '-' + j);
                let content = '';
                if (state.board[i][j] === 0) {
                    content = 'O';
                }
                else if (state.board[i][j] === 1) {
                    content = 'X';
                }
                cell.innerHTML = content;
            }
        }

        // Update player status.
        if (game.activePlayer === this.identity.playerNumber) {
            $('#player-status').text('Your turn');
        }
        else {
            $('#player-status').text('Opponent\'s turn');
        }
    };
});
