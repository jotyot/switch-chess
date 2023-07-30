import Player from "./Player";
import PieceMoves from "./PieceMoves";
import Timings from "../config/Timings";

class BoardState {
  private white: Player;
  private black: Player;
  private boardSize: [number, number];
  private whiteTurn: boolean = true;
  private isOver: boolean = false;

  /**A function that reRenders the board */
  private updateBoard: () => void;
  /**A function that starts a new round after the game is over */
  private newRound: (winner: boolean, piece: string) => void;
  private screenShake: (d: number) => void;

  constructor(
    [numRows, numCols]: [number, number],
    whiteStart: string,
    blackStart: string,
    updateBoard: () => void,
    newRound: (winner: boolean, piece: string) => void,
    screenShake: (d: number) => void
  ) {
    this.boardSize = [numRows, numCols];
    this.white = new Player(true, whiteStart, this.boardSize);
    this.black = new Player(false, blackStart, this.boardSize);
    this.updateBoard = updateBoard;
    this.newRound = newRound;
    this.screenShake = screenShake;
  }

  public getWhiteTurn = () => this.whiteTurn;
  public getBoardSize = () => this.boardSize;
  public getWhite = () => this.white;
  public getBlack = () => this.black;
  public getIsOver = () => this.isOver;

  /**
   * Checks if a move can actually be made to the target location, then executes movePlayer accordingly
   * @param target The [row, col] of the location of the next move
   * @param popQueue A function that pops off the piece in the pieceQueue
   */
  public attemptMove(target: [number, number], popQueue: () => string): void {
    const possibleMoves = PieceMoves.movesFromBoardState(this, true, true);
    possibleMoves.forEach((move) => {
      if (PieceMoves.coordsEqual(target, move)) {
        this.movePlayer(target, popQueue());
      }
    });
  }

  /**
   * Sets the position of the piece to be moved + handles any capturing and new turn logic
   * @param target The [row, col] of the location of the next move
   * @param targetPiece The piece the player will turn into after moving
   */
  private movePlayer(target: [number, number], targetPiece: string): void {
    const [player, other] = this.whiteTurn
      ? [this.white, this.black]
      : [this.black, this.white];
    player.setPos(target);

    if (PieceMoves.coordsEqual(player.getPos(), other.getPos())) {
      other.die();
      this.isOver = true;
      this.screenShake(Timings.moveDuration + Timings.popDelay);
      this.newRound(this.whiteTurn, other.getPiece());
    }

    const piece = PieceMoves.specialPieces(
      targetPiece,
      player.getPos(),
      this.boardSize,
      this.whiteTurn
    );
    if (targetPiece !== piece)
      this.screenShake(Timings.moveDuration + 1.5 * Timings.popDelay);
    player.setPiece(piece);

    this.whiteTurn = !this.whiteTurn;

    // Draw check
    const nextMoves = PieceMoves.movesFromBoardState(this, true, true);
    if (nextMoves.length < 1) {
      this.isOver = true;
      this.updateBoard();
      this.newRound(this.whiteTurn, "N/A");
    }

    this.updateBoard();
  }
}

export default BoardState;
