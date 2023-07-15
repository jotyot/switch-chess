import Player from "./Player";
import PieceMoves from "./PieceMoves";

class BoardState {
  private white: Player;
  private black: Player;
  private boardSize: number[];
  private whiteTurn: boolean = true;
  private isOver: boolean = false;

  private updateBoard: () => void;
  private newRound: (winner: boolean, piece: string) => void;

  constructor(
    [numRows, numCols]: number[],
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

  public getBoardHighlights() {
    const [numRows, numCols] = this.boardSize;
    const highlights = [...Array(numRows)].map(() =>
      Array(numCols).fill(false)
    );
    this.possibleMoves().forEach(([r, c]) => {
      if (r > -1 && r < numCols && c > -1 && c < numCols)
        highlights[r][c] = true;
    });
    return highlights;
  }

  public attemptMove(target: number[], popQueue: () => string) {
    this.possibleMoves().forEach((move) => {
      if (PieceMoves.coordsEqual(target, move)) {
        this.movePlayer(target, popQueue());
      }
    });
  }

  private movePlayer(target: number[], targetPiece: string) {
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

  private possibleMoves() {
    if (this.isOver) return [[]];

    const [player, other] = this.whiteTurn
      ? [this.white, this.black]
      : [this.black, this.white];

    const possibleMoves = PieceMoves.possibleMoves(
      player.getPiece(),
      player.getPos(),
      other.getPos(),
      this.boardSize,
      this.whiteTurn
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
