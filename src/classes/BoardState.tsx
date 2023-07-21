import Player from "./Player";
import PieceMoves from "./PieceMoves";

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

  constructor(
    [numRows, numCols]: [number, number],
    whiteStart: string,
    blackStart: string,
    updateBoard: () => void,
    newRound: (winner: boolean, piece: string) => void
  ) {
    this.boardSize = [numRows, numCols];
    this.white = new Player(true, whiteStart, this.boardSize);
    this.black = new Player(false, blackStart, this.boardSize);
    this.updateBoard = updateBoard;
    this.newRound = newRound;
  }

  public getWhiteTurn = () => this.whiteTurn;
  public getBoardSize = () => this.boardSize;
  public getWhite = () => this.white;
  public getBlack = () => this.black;
  public getIsOver = () => this.isOver;

  /**
   * @param white the highlights for the white player? or black?
   * @param [forAI=false] enable to assume the other player has no impact on movement
   * @returns A 2d array of trues/falses determining that the corresponding square on the board can have a piece move to it
   */
  public getBoardHighlights(white: boolean, forAI = false): boolean[][] {
    const [numRows, numCols] = this.boardSize;
    const highlights = [...Array(numRows)].map(() =>
      Array(numCols).fill(false)
    );
    this.possibleMoves(white, forAI).forEach(([r, c]) => {
      if (r > -1 && r < numRows && c > -1 && c < numCols)
        highlights[r][c] = true;
    });
    return highlights;
  }

  /**
   * Checks if a move can actually be made to the target location, then executes movePlayer accordingly
   * @param target The [row, col] of the location of the next move
   * @param popQueue A function that pops off the piece in the pieceQueue
   */
  public attemptMove(target: [number, number], popQueue: () => string): void {
    this.possibleMoves(this.whiteTurn).forEach((move) => {
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
      this.newRound(this.whiteTurn, other.getPiece());
    }
    player.setPiece(targetPiece);

    // If the pawn is at the end at the beginning of turn, it turns into a queen
    if (
      player.getPiece() === "Pawn" &&
      ((player.getIsWhite() && player.getPos()[0] === 0) ||
        (!player.getIsWhite() && player.getPos()[0] === this.boardSize[0] - 1))
    ) {
      player.setPiece("SuperPawn");
    }

    this.whiteTurn = !this.whiteTurn;
    this.updateBoard();
  }

  /**
   * Gets the possible places a player can move to on a given turn + handles draw logic
   * @param isWhite the moves of the white player? or black?
   * @returns An array of [row, col] pairs someone can move to
   */
  private possibleMoves(isWhite: boolean, forAI = false): [number, number][] {
    if (this.isOver) return [];

    const [player, other] = isWhite
      ? [this.white, this.black]
      : [this.black, this.white];

    const possibleMoves = PieceMoves.possibleMoves(
      player.getPiece(),
      player.getPos(),
      other.getPos(),
      this.boardSize,
      isWhite,
      forAI
    );

    if (possibleMoves.length < 1) {
      this.isOver = true;
      this.updateBoard();
      this.newRound(this.whiteTurn, "N/A");
    }

    return possibleMoves;
  }
}

export default BoardState;
