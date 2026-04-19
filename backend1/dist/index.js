"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const ws_1 = require("ws");
const GameMnager_1 = require("./GameMnager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameMnager_1.GameManager();
wss.on('connection', (ws) => {
    ws.on('error', console.error);
    gameManager.addUser(ws);
    ws.on('close', () => {
        gameManager.removeUser(ws);
    });
});
//# sourceMappingURL=index.js.map