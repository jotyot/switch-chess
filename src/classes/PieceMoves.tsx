class PieceMoves {
  public static possibleMoves(
    piece: string,
    playerPos: number[],
    otherPos: number[],
    boardSize: number[],
    white: boolean,
    forAI = false
  ) {
    const [numRows, numCols] = boardSize;
    const maxLength = Math.max(numRows, numCols);

    let moves: number[][];
    switch (piece) {
      case "Pawn":
        moves = PieceMoves.pawnMoves(
          playerPos,
          otherPos,
          numRows,
          white,
          forAI
        );
        break;
      case "Rook":
        moves = PieceMoves.rookMoves(playerPos, otherPos, maxLength);
        break;
      case "Bishop":
        moves = PieceMoves.bishopMoves(playerPos, otherPos, maxLength);
        break;
      case "Knight":
        moves = PieceMoves.knightMoves(playerPos);
        break;
      case "Queen":
        moves = PieceMoves.queenMoves(playerPos, otherPos, maxLength);
        break;
      case "King":
        moves = PieceMoves.kingMoves(playerPos);
        break;
      case "SuperPawn":
        moves = PieceMoves.superPawnMoves(playerPos, otherPos, maxLength);
        break;
      default:
        moves = [[]];
        break;
    }
    moves = moves.filter(
      ([r, c]) => r > -1 && r < numRows && c > -1 && c < numCols
    );

    return moves;
  }

  public static pawnMoves(
    playerPos: number[],
    otherPos: number[],
    numRows: number,
    white: boolean,
    forAI = false
  ) {
    const direction = white ? -1 : 1;
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = playerPos;
    if (!PieceMoves.coordsEqual(otherPos, [r + direction, c]))
      moves.push([r + direction, c]);
    if (
      // 0 is the top row
      ((white && r == numRows - 1) || (!white && r == 0)) &&
      !PieceMoves.coordsEqual(otherPos, [r + direction * 2, c])
    )
      moves.push([r + direction * 2, c]);
    if (
      PieceMoves.coordsEqual(otherPos, [r + direction, c + 1]) ||
      PieceMoves.coordsEqual(otherPos, [r + direction, c - 1])
    )
      moves.push(otherPos);
    // If this moveset was generated for AI,
    // assume otherPos is in capture position
    if (forAI) {
      moves.push([r + direction, c + 1]);
      moves.push([r + direction, c - 1]);
    }
    return moves;
  }

  public static rookMoves(
    playerPos: number[],
    otherPos: number[],
    maxLength: number
  ) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = playerPos;
    let clear_path = [true, true, true, true];
    for (let i = 1; i < maxLength; i++) {
      const directions = [
        [r + i, c],
        [r - i, c],
        [r, c + i],
        [r, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (PieceMoves.coordsEqual(direction, otherPos))
          clear_path[index] = false;
      });
    }
    return moves;
  }

  public static bishopMoves(
    playerPos: number[],
    otherPos: number[],
    maxLength: number
  ) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = playerPos;
    let clear_path = [true, true, true, true];
    for (let i = 1; i < maxLength; i++) {
      const directions = [
        [r + i, c + i],
        [r + i, c - i],
        [r - i, c + i],
        [r - i, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (PieceMoves.coordsEqual(direction, otherPos))
          clear_path[index] = false;
      });
    }
    return moves;
  }

  public static knightMoves(playerPos: number[]) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = playerPos;
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

  public static queenMoves(
    playerPos: number[],
    otherPos: number[],
    maxLength: number
  ) {
    return [
      ...PieceMoves.rookMoves(playerPos, otherPos, maxLength),
      ...PieceMoves.bishopMoves(playerPos, otherPos, maxLength),
    ];
  }

  public static kingMoves(playerPos: number[]) {
    const moves: number[][] = Array(0).fill(null);
    const [r, c] = playerPos;
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

  public static superPawnMoves(
    playerPos: number[],
    otherPos: number[],
    maxLength: number
  ) {
    return [
      ...PieceMoves.queenMoves(playerPos, otherPos, maxLength),
      ...PieceMoves.knightMoves(playerPos),
    ];
  }

  public static coordsEqual(a: number[], b: number[]) {
    const [x, y] = a;
    const [w, z] = b;
    return x === w && y === z;
  }
}

export default PieceMoves;
