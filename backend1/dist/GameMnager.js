"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const message_1 = require("./message");
class GameManager {
    constructor() {
        this.game = [];
        this.pendingUsers = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((s) => s !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === message_1.INIT_GAME) {
                if (this.pendingUsers) {
                    const game = new Game_1.Game(this.pendingUsers, socket);
                    this.game.push(game);
                    this.pendingUsers = null;
                }
                else {
                    this.pendingUsers = socket;
                }
            }
            if (message.type === message_1.MOVE) {
                const game = this.game.find((g) => g.player1 === socket || g.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
    handleMessage(socket, message) { }
}
exports.GameManager = GameManager;
//# sourceMappingURL=GameMnager.js.map