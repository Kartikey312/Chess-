"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        setTimeout(() => {
            this.player1.send(JSON.stringify({
                type: message_1.INIT_GAME,
                payload: { color: "white" },
            }));
            this.player2.send(JSON.stringify({
                type: message_1.INIT_GAME,
                payload: { color: "black" },
            }));
        }, 50);
    }
    makeMove(player, move) {
        if (this.moveCount % 2 === 0 && player !== this.player1)
            return;
        if (this.moveCount % 2 === 1 && player !== this.player2)
            return;
        let result;
        try {
            result = this.board.move(move);
            if (!result)
                return;
        }
        catch {
            return;
        }
        this.moveCount++;
        const opponent = player === this.player1 ? this.player2 : this.player1;
        const movePayload = {
            type: message_1.MOVE,
            payload: {
                move,
                moveCount: this.moveCount,
            },
        };
        // Send move to both players
        player.send(JSON.stringify(movePayload));
        opponent.send(JSON.stringify(movePayload));
        if (this.board.isGameOver()) {
            const winner = this.moveCount % 2 === 0 ? "black" : "white";
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: { winner },
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: { winner },
            }));
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map