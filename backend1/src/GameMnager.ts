import WebSocket from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./message";

export class GameManager {
  private game: Game[] = []; 
  private pendingUsers: WebSocket | null = null;
  private users: WebSocket[] = [];

  constructor() {}

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket); 
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((s) => s !== socket);
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString()); 

      if (message.type === INIT_GAME) {
        if (this.pendingUsers) {
          const game = new Game(this.pendingUsers, socket); 
          this.game.push(game);
          this.pendingUsers = null;
       
        } else {
          this.pendingUsers = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.game.find(
          (g: Game) => g.player1 === socket || g.player2 === socket
        );

        if (game) {
          game.makeMove(socket, message.move); 
        }
      }
    });
  }

  private handleMessage(socket: WebSocket, message: string) {}
}