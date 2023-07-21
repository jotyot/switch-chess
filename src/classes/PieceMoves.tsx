import BoardState from "./BoardState";

/**
 * Contains methods for getting the possible moves of pieces given a bunch of properties.
 */
class PieceMoves {
  public static movesFromBoardState(
    boardState: BoardState,
    playerTurn: boolean,
    attacks = true
  ): [number, number][] {
    const white = boardState.getWhite();
    const black = boardState.getBlack();
    const whiteTurn = boardState.getWhiteTurn();
    const [player, other] = (playerTurn ? whiteTurn : !whiteTurn)
      ? [white, black]
      : [black, white];
    const playerPos = player.getPos();
    const otherPos = other.getPos();
    const [numRows, numCols] = boardState.getBoardSize();
    const isWhite = player.getIsWhite();
    const piece = player.getPiece();
    return this.possibleMoves(
      piece,
      playerPos,
      otherPos,
      [numRows, numCols],
      isWhite
    );
  }

  /**
   * Gets the possible positions piece can move to given the board state.
   * @param piece "Pawn", "Knight", "Rook", "Bishop", "Queen", "King", or  "SuperPawn"
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param boardSize [numRows, numCols]
   * @param isWhite is this piece white or black?
   * @param obstructed is the moveset affected by where the other player is?
   * @returns An array of positions the player can move to
   */
  public static possibleMoves(
    piece: string,
    playerPos: [number, number],
    otherPos: [number, number],
    boardSize: [number, number],
    isWhite: boolean,
    obstructed = true
  ): [number, number][] {
    const [numRows, numCols] = boardSize;
    const maxLength = Math.max(numRows, numCols);

    const pieceMoves = new Map([
      [
        "Pawn",
        PieceMoves.pawnMoves(playerPos, otherPos, numRows, isWhite, obstructed),
      ],
      [
        "Rook",
        PieceMoves.rookMoves(playerPos, otherPos, maxLength, obstructed),
      ],
      [
        "Bishop",
        PieceMoves.bishopMoves(playerPos, otherPos, maxLength, obstructed),
      ],
      ["Knight", PieceMoves.knightMoves(playerPos)],
      [
        "Queen",
        PieceMoves.queenMoves(playerPos, otherPos, maxLength, obstructed),
      ],
      ["King", PieceMoves.kingMoves(playerPos)],
      [
        "SuperPawn",
        PieceMoves.superPawnMoves(playerPos, otherPos, maxLength, obstructed),
      ],
    ]);
    let moves = pieceMoves.get(piece) || [];
    moves = moves.filter(
      ([r, c]) => r > -1 && r < numRows && c > -1 && c < numCols
    );
    return moves;
  }

  /**
   * Gives the pawn's possible moves
   * @remarks obstructed=true on gives every possible move a pawn can capture with
   * so that an AIplayer won't move to a pawn's diagonal capture position
   *
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param numRows How many rows the board has
   * @param isWhite Is the player isWhite?
   * @param obstructed Is this used for AI?
   * @returns An array of positions
   */
  public static pawnMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    numRows: number,
    isWhite: boolean,
    obstructed = false
  ) {
    const direction = isWhite ? -1 : 1;
    const moves: [number, number][] = Array(0).fill(null);
    const [r, c] = playerPos;
    if (!PieceMoves.coordsEqual(otherPos, [r + direction, c]))
      moves.push([r + direction, c]);
    if (
      // 0 is the top row
      !PieceMoves.coordsEqual(otherPos, [r + direction * 2, c]) &&
      !PieceMoves.coordsEqual(otherPos, [r + direction, c]) &&
      ((isWhite && r == numRows - 1) || (!isWhite && r == 0))
    )
      moves.push([r + direction * 2, c]);
    if (
      PieceMoves.coordsEqual(otherPos, [r + direction, c + 1]) ||
      PieceMoves.coordsEqual(otherPos, [r + direction, c - 1])
    )
      moves.push(otherPos);
    // If this moveset was generated for AI,
    // assume otherPos is in capture position
    if (obstructed) {
      moves.push([r + direction, c + 1]);
      moves.push([r + direction, c - 1]);
    }
    return moves;
  }

  /**
   * Rook's possible moves
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param maxLength the length or height of the board, whichever is longer
   * @returns An array of positions
   */
  public static rookMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    maxLength: number,
    obstructed = true
  ): [number, number][] {
    const moves: [number, number][] = Array(0).fill(null);
    const [r, c] = playerPos;
    let clear_path = [true, true, true, true];
    for (let i = 1; i < maxLength; i++) {
      const directions: [number, number][] = [
        [r + i, c],
        [r - i, c],
        [r, c + i],
        [r, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (obstructed && PieceMoves.coordsEqual(direction, otherPos))
          clear_path[index] = false;
      });
    }
    return moves;
  }

  /**
   * The bishop's possible moves
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param maxLength the length or height of the board, whichever is longer
   * @returns An array of positions
   */
  public static bishopMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    maxLength: number,
    obstructed = true
  ) {
    const moves: [number, number][] = Array(0).fill(null);
    const [r, c] = playerPos;
    let clear_path = [true, true, true, true];
    for (let i = 1; i < maxLength; i++) {
      const directions: [number, number][] = [
        [r + i, c + i],
        [r + i, c - i],
        [r - i, c + i],
        [r - i, c - i],
      ];
      directions.forEach((direction, index) => {
        if (clear_path[index]) moves.push(direction);
        if (obstructed && PieceMoves.coordsEqual(direction, otherPos))
          clear_path[index] = false;
      });
    }
    return moves;
  }

  /**
   * The knights moves
   * @param playerPos [row, col] of the player's position
   * @returns An array of positions
   */
  public static knightMoves(playerPos: [number, number]) {
    const moves: [number, number][] = Array(0).fill(null);
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

  /**
   * The queens's possible moves. Rook + Bishop
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param maxLength the length or height of the board, whichever is longer
   * @returns An array of positions
   */
  public static queenMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    maxLength: number,
    obstructed = true
  ) {
    return [
      ...PieceMoves.rookMoves(playerPos, otherPos, maxLength, obstructed),
      ...PieceMoves.bishopMoves(playerPos, otherPos, maxLength, obstructed),
    ];
  }

  /**
   * Kings moves
   * @param playerPos [row, col] of the player's position
   * @returns An array of positions
   */
  public static kingMoves(playerPos: [number, number]) {
    const moves: [number, number][] = Array(0).fill(null);
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

  /**
   * The superpawn's possible moves. Queen + Knight
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param maxLength the length or height of the board, whichever is longer
   * @returns An array of positions
   */
  public static superPawnMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    maxLength: number,
    obstructed = true
  ) {
    return [
      ...PieceMoves.queenMoves(playerPos, otherPos, maxLength, obstructed),
      ...PieceMoves.knightMoves(playerPos),
    ];
  }

  public static coordsEqual(a: [number, number], b: [number, number]) {
    const [x, y] = a;
    const [w, z] = b;
    return x === w && y === z;
  }
}

export default PieceMoves;
