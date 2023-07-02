import Player from "./Player";
import PieceMoves from "./PieceMoves";

class BoardState {
  private white: Player;
  private black: Player;
  private boardSize: number[];
  private whiteTurn: boolean = true;
  private isOver: boolean = false;
  private winner: boolean = true; // winner ? white : black

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
  public getIsOver = () => this.isOver;
  public getWinner = () => this.winner;

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
      this.winner = this.whiteTurn;
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
    let piece = player.getPiece();

    // If the pawn is at the end at the beginning of turn, it turns into a queen
    if (
      piece === "Pawn" &&
      ((player.getIsWhite() && playerPos[0] === 0) ||
        (!player.getIsWhite() && playerPos[0] === this.boardSize[0] - 1))
    ) {
      piece = "Queen";
      player.setPiece(piece);
    }

    const possibleMoves = PieceMoves.possibleMoves(
      piece,
      playerPos,
      otherPos,
      this.boardSize,
      this.whiteTurn
    );

    if (possibleMoves.length < 1) {
      this.isOver = true;
      this.winner = !this.whiteTurn;
    }

    return possibleMoves;
  }
}

export default BoardState;
