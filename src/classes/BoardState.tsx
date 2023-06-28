import Player from "./Player";

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
      if (coordsEqual(target, move)) {
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

    if (coordsEqual(player.getPos(), other.getPos())) {
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

    switch (player.getPiece()) {
      case "Pawn":
        return this.pawnMoves(player, other);
      case "Rook":
        return this.rookMoves(player, other);
      case "Bishop":
        return this.bishopMoves(player, other);
      case "Knight":
        return this.knightMoves(player);
      case "Queen":
        return this.queenMoves(player, other);
      case "King":
        return this.kingMoves(player);

      default:
        return Array(0);
    }
  }

  private pawnMoves(player: Player, other: Player) {
    const direction = this.whiteTurn ? -1 : 1;
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = player.getPos();
    if (!coordsEqual(other.getPos(), [r + direction, c]))
      moves.push([r + direction, c]);
    if (
      (this.whiteTurn && r == this.boardSize[0] - 1) ||
      (!this.whiteTurn && r == 0)
    )
      moves.push([r + direction * 2, c]);
    if (
      coordsEqual(other.getPos(), [r + direction, c + 1]) ||
      coordsEqual(other.getPos(), [r + direction, c - 1])
    )
      moves.push(other.getPos());
    return moves;
  }

  private rookMoves(player: Player, other: Player) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = player.getPos();
    const [numRows, numCols] = this.boardSize;
    const max = Math.max(numRows, numCols);
    let clear_path = [true, true, true, true];
    for (let i = 1; i < max; i++) {
      const directions = [
        [r + i, c],
        [r - i, c],
        [r, c + i],
        [r, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (coordsEqual(direction, other.getPos())) clear_path[index] = false;
      });
    }
    return moves;
  }

  private bishopMoves(player: Player, other: Player) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = player.getPos();
    const [numRows, numCols] = this.boardSize;
    const max = Math.max(numRows, numCols);
    let clear_path = [true, true, true, true];
    for (let i = 1; i < max; i++) {
      const directions = [
        [r + i, c + i],
        [r + i, c - i],
        [r - i, c + i],
        [r - i, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (coordsEqual(direction, other.getPos())) clear_path[index] = false;
      });
    }
    return moves;
  }

  private knightMoves(player: Player) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = player.getPos();
    moves.push([r + 2, c + 1]);
    moves.push([r + 2, c - 1]);
    moves.push([r - 2, c + 1]);
    moves.push([r - 2, c - 1]);
    moves.push([r + 1, c + 2]);
    moves.push([r + 1, c - 2]);
    moves.push([r - 1, c + 2]);
    moves.push([r - 1, c - 2]);
    return moves;
  }

  private queenMoves(player: Player, other: Player) {
    return [
      ...this.rookMoves(player, other),
      ...this.bishopMoves(player, other),
    ];
  }

  private kingMoves(player: Player) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = player.getPos();
    moves.push([r + 1, c + 1]);
    moves.push([r + 1, c - 1]);
    moves.push([r - 1, c + 1]);
    moves.push([r - 1, c - 1]);
    moves.push([r + 1, c]);
    moves.push([r - 1, c]);
    moves.push([r, c + 1]);
    moves.push([r, c - 1]);
    return moves;
  }
}

function coordsEqual(a: number[], b: number[]) {
  const [x, y] = a;
  const [w, z] = b;
  return x === w && y === z;
}

export default BoardState;
