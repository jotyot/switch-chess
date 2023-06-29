import Player from "./Player";
import PieceMoves from "./PieceMoves";

class BoardState {
  white: Player;
  black: Player;
  boardSize: number[];
  whiteTurn: boolean = true;
  isOver: boolean = false;

  constructor(
    [numRows, numCols]: number[],
    whiteStart: string,
    blackStart: string
  ) {
    this.boardSize = [numRows, numCols];
    this.white = new Player(true, whiteStart, this.boardSize);
    this.black = new Player(false, blackStart, this.boardSize);
  }

  public getWhiteTurn = () => this.whiteTurn;
  public getBoardSize = () => this.boardSize;
  public getWhite = () => this.white;
  public getBlack = () => this.black;

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

  public attemptMove(
    target: number[],
    updateBoard: () => void,
    popQueue: () => string
  ) {
    this.possibleMoves().forEach((move) => {
      if (PieceMoves.coordsEqual(target, move)) {
        this.movePlayer(target, popQueue(), updateBoard);
      }
    });
  }

  private movePlayer(
    target: number[],
    targetPiece: string,
    updateBoard: () => void
  ) {
    const [player, other] = this.whiteTurn
      ? [this.white, this.black]
      : [this.black, this.white];
    player.setPos(target);

    if (PieceMoves.coordsEqual(player.getPos(), other.getPos())) {
      other.die();
      this.isOver = true;
    }

    if (this.whiteTurn) this.white.setPiece(targetPiece);
    else this.black.setPiece(targetPiece);

    this.whiteTurn = !this.whiteTurn;
    updateBoard();
  }

  private possibleMoves() {
    if (this.isOver) return [[]];

    const [player, other] = this.whiteTurn
      ? [this.white, this.black]
      : [this.black, this.white];

    const playerPos = player.getPos();
    const otherPos = other.getPos();
    const piece = player.getPiece();

    return PieceMoves.possibleMoves(
      piece,
      playerPos,
      otherPos,
      this.boardSize,
      this.whiteTurn
    );
  }
}

export default BoardState;
