import BoardState from "./BoardState";

/**
 * Contains methods for getting the possible moves of pieces given a bunch of properties.
 */
class PieceMoves {
  /**
   * converts positions to a true value on a grid
   * @param moves array of positions
   * @param boardSize numrows, numcols
   * @returns a numrows x numcols 2d bool array that is true where the move exists
   */
  public static movesToMap(
    moves: [number, number][],
    boardSize: [number, number]
  ): boolean[][] {
    const [numRows, numCols] = boardSize;
    let map = [...Array(numRows)].map(() => Array(numCols).fill(false));

    moves.forEach(([r, c]) => (map[r][c] = true));

    return map;
  }

  /**
   * if the piece turns into another one when in a certain position,
   * it will return such piece. otherwise its the same
   * @param piece original piece
   * @param position
   * @param boardSize
   * @param isWhite is the piece white
   * @returns may or may not be a different piece
   */
  public static specialPieces(
    piece: string,
    position: [number, number],
    boardSize: [number, number],
    isWhite: boolean
  ): string {
    const numRows = boardSize[0];
    if (
      piece === "Pawn" &&
      (isWhite ? position[0] === 0 : position[0] === numRows - 1)
    ) {
      piece = "SuperPawn";
    }
    return piece;
  }

  /**
   * Gets the possible positions piece can move to given the board state.
   * @param boardState the board state
   * @param playerTurn the player's move's or the other's
   * @returns an array of positions the player can move to
   */
  public static movesFromBoardState(
    boardState: BoardState,
    playerTurn: boolean,
    obstructions: boolean
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
    return this.moves(
      piece,
      playerPos,
      otherPos,
      [numRows, numCols],
      isWhite,
      obstructions
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
   * @param attack basically return the pawn's capture moves or noncapture moves
   * @returns An array of positions the player can move to
   */
  public static moves(
    piece: string,
    playerPos: [number, number],
    otherPos: [number, number],
    boardSize: [number, number],
    isWhite: boolean,
    obstructed = true
  ): [number, number][] {
    const [numRows, numCols] = boardSize;
    const maxLength = Math.max(numRows, numCols);

    let moves: [number, number][];
    switch (piece) {
      case "Pawn":
        moves = PieceMoves.pawnMoves(
          playerPos,
          otherPos,
          numRows,
          isWhite,
          obstructed
        );
        break;
      case "Rook":
        moves = PieceMoves.rookMoves(
          playerPos,
          otherPos,
          maxLength,
          obstructed
        );
        break;
      case "Bishop":
        moves = PieceMoves.bishopMoves(
          playerPos,
          otherPos,
          maxLength,
          obstructed
        );
        break;
      case "Knight":
        moves = PieceMoves.knightMoves(playerPos);
        break;
      case "Queen":
        moves = PieceMoves.queenMoves(
          playerPos,
          otherPos,
          maxLength,
          obstructed
        );
        break;
      case "King":
        moves = PieceMoves.kingMoves(playerPos);
        break;
      case "SuperPawn":
        moves = PieceMoves.superPawnMoves(
          playerPos,
          otherPos,
          maxLength,
          obstructed
        );
        break;
      default:
        moves = [];
    }

    moves = moves.filter(
      ([r, c]) => r > -1 && r < numRows && c > -1 && c < numCols
    );
    return moves;
  }

  /**
   * Gives the pawn's possible moves
   * @remarks obstructed=true doesn't show irrelevant diagonal capture
   * and has double-jump affected by otherpos.
   * obstructed=false shows all diagonal captures always and
   * double jump if in the correct row regardless of otherpos
   *
   * @param playerPos [row, col] of the player's position
   * @param otherPos [row, col] of the opponents's position
   * @param numRows How many rows the board has
   * @param isWhite Is the player isWhite?
   * @param obstructed is this affected by otherPos?
   * @returns An array of positions
   */
  public static pawnMoves(
    playerPos: [number, number],
    otherPos: [number, number],
    numRows: number,
    isWhite: boolean,
    obstructed = true
  ) {
    const direction = isWhite ? -1 : 1;
    const moves: [number, number][] = Array(0).fill(null);
    const [r, c] = playerPos;
    if (obstructed && !PieceMoves.coordsEqual(otherPos, [r + direction, c]))
      moves.push([r + direction, c]);
    if (
      ((isWhite && r == numRows - 1) || (!isWhite && r == 0)) &&
      obstructed &&
      !PieceMoves.coordsEqual(otherPos, [r + direction * 2, c]) &&
      !PieceMoves.coordsEqual(otherPos, [r + direction, c])
    )
      moves.push([r + direction * 2, c]);
    if (
      PieceMoves.coordsEqual(otherPos, [r + direction, c + 1]) ||
      PieceMoves.coordsEqual(otherPos, [r + direction, c - 1])
    )
      moves.push(otherPos);
    // If this moveset was generated for AI,
    // assume otherPos is in capture position
    if (!obstructed) {
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
