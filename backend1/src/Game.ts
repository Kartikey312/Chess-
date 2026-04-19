import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE } from "./message";
import { INIT_GAME } from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );    
  }

  makeMove(
    player: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    // ✅ FIX: move count logic
    if (this.board.history().length % 2 === 0 && player !== this.player1) {
      return;
    }
    if (this.board.history().length % 2 === 1 && player !== this.player2) {
      return;
    }

    try {
      const result = this.board.move(move); // ✅ FIX: check result
      if (!result) return;
    } catch (error) {
      console.error("Invalid move:", error);
      return;
    }

    if (this.board.isGameOver()) {
      // ✅ FIX: use send instead of emit
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      return;
    }

    // ✅ FIX: history() instead of moves
    if (this.board.history().length % 2 === 0) {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }

    // (your comment kept)
    // Send the updated board to both players
  }
}