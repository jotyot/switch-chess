import BoardState from "./BoardState";
import PieceMoves from "./PieceMoves";

class AIPlayer {
  // If a player can capture, it will. Otherwise it will try
  // not to land in a square that can be captured

  public static possibleMoves(boardState: BoardState) {
    const [player, other] = boardState.whiteTurn
      ? [boardState.white, boardState.black]
      : [boardState.black, boardState.white];

    const playerPos = player.getPos();
    const otherPos = other.getPos();

    let playerMoves = PieceMoves.possibleMoves(
      player.getPiece(),
      playerPos,
      otherPos,
      boardState.boardSize,
      boardState.whiteTurn
    );

    // If piece can capture player
    const [or, oc] = otherPos;
    let canCapture = false;
    playerMoves.forEach(([r, c]) => {
      if (r === or && c === oc) canCapture = true;
    });
    if (canCapture) return [otherPos];

    const otherMoves = PieceMoves.possibleMoves(
      other.getPiece(),
      otherPos,
      playerPos,
      boardState.boardSize,
      !boardState.whiteTurn,
      true
    );

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

  public static randomMove(boardState: BoardState) {
    if (boardState.isOver) return null;

    const moves = AIPlayer.possibleMoves(boardState);

    return moves[~~Math.random() * moves.length];
  }
}

export default AIPlayer;
