import BoardState from "./BoardState";
import PieceMoves from "./PieceMoves";

/**
 * Contains functions for generating a move according to an ai player
 */
class AIPlayer {
  // If a player can capture, it will. Otherwise it will try
  // not to land in a square that can be captured

  /**
   * Gets the possible moves of the current player that won't get immediately captured
   * @remarks if the player can capture, the only possible move will reduce to that move
   * if the player avoid being captured, it returns the normal possible moveset.
   * @param boardState an instance of the BoardState class
   * @returns array of possible positions that won't get immediately captured
   */
  public static possibleMoves(boardState: BoardState): [number, number][] {
    const [player, other] = boardState.getWhiteTurn()
      ? [boardState.getWhite(), boardState.getBlack()]
      : [boardState.getBlack(), boardState.getWhite()];

    const playerPos = player.getPos();
    const otherPos = other.getPos();

    let playerPiece = player.getPiece();
    let otherPiece = other.getPiece();

    let playerMoves = PieceMoves.possibleMoves(
      playerPiece,
      playerPos,
      otherPos,
      boardState.getBoardSize(),
      boardState.getWhiteTurn()
    );

    // If piece can capture player
    const [or, oc] = otherPos;
    let canCapture = false;
    playerMoves.forEach(([r, c]) => {
      if (r === or && c === oc) canCapture = true;
    });
    if (canCapture) return [otherPos];

    // Ai = true
    const otherMoves = PieceMoves.possibleMoves(
      otherPiece,
      otherPos,
      playerPos,
      boardState.getBoardSize(),
      !boardState.getWhiteTurn(),
      true
    );

    /**
     * Moves that dont overlap with opponenets move next turn
     */
    const safeMoves = playerMoves.filter(([r, c]) => {
      let notOverlap = true;
      otherMoves.forEach(([or, oc]) => {
        if (r === or && c === oc) notOverlap = false;
      });
      return notOverlap;
    });

    if (safeMoves.length > 0) playerMoves = safeMoves;

    return playerMoves;
  }

  /**
   * Chooses a random move that wont get immediately captured or the winning move if possible
   * @param boardState instance of boardState class
   * @returns one position randomly chosen from the possible moves
   */
  public static randomMove(boardState: BoardState) {
    if (boardState.getIsOver()) return null;

    const moves = AIPlayer.possibleMoves(boardState);

    return moves[~~(Math.random() * moves.length)];
  }
}

export default AIPlayer;
