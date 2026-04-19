import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE, INIT_GAME } from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private moveCount: number = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    setTimeout(() => {
      this.player1.send(
        JSON.stringify({
          type: INIT_GAME,
          payload: { color: "white" },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: INIT_GAME,
          payload: { color: "black" },
        })
      );
    }, 50);
  }

  makeMove(
    player: WebSocket,
    move: {
      from: string;
      to: string;
      promotion?: string;
    }
  ) {
  
    if (this.moveCount % 2 === 0 && player !== this.player1) return;
    if (this.moveCount % 2 === 1 && player !== this.player2) return;

    let result;
    try {
      result = this.board.move(move);
      if (!result) return; 
    } catch {
      return;
    }

    this.moveCount++;

    const opponent = player === this.player1 ? this.player2 : this.player1;
    const movePayload = {
      type: MOVE,
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

      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: { winner },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: { winner },
        })
      );
    }
  }
}