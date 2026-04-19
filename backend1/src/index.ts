// index.ts
import WebSocket, { WebSocketServer } from 'ws';
import { GameManager } from './GameMnager';

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on('connection', (ws: WebSocket) => {
  ws.on('error', console.error);
  gameManager.addUser(ws);

  ws.on('close', () => {
    gameManager.removeUser(ws);
  });
});