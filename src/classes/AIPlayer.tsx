import BoardState from "./BoardState";
import PieceMoves from "./PieceMoves";

class AIPlayer {
  // If a player can capture, it will. Otherwise it will try
  // not to land in a square that can be captured

  public static possibleMoves(boardState: BoardState) {
    const [player, other] = boardState.getWhiteTurn()
      ? [boardState.getWhite(), boardState.getBlack()]
      : [boardState.getBlack(), boardState.getWhite()];

    const playerPos = player.getPos();
    const otherPos = other.getPos();

    let playerPiece = player.getPiece();
    let otherPiece = other.getPiece();

    // If the pawn is at the end at the beginning of turn, it turns into a queen
    if (
      playerPiece === "Pawn" &&
      ((player.getIsWhite() && playerPos[0] === 0) ||
        (!player.getIsWhite() &&
          playerPos[0] === boardState.getBoardSize()[0] - 1))
    ) {
      playerPiece = "Queen";
    }

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

    // The AI assumes the pawn will turn into the queen next turn if it can
    if (
      otherPiece === "Pawn" &&
      ((other.getIsWhite() && playerPos[0] === 0) ||
        (!other.getIsWhite() &&
          playerPos[0] === boardState.getBoardSize()[0] - 1))
    ) {
      otherPiece = "Queen";
    }

    const otherMoves = PieceMoves.possibleMoves(
      otherPiece,
      otherPos,
      playerPos,
      boardState.getBoardSize(),
      !boardState.getWhiteTurn(),
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
    if (boardState.getIsOver()) return null;

    const moves = AIPlayer.possibleMoves(boardState);

    return moves[~~Math.random() * moves.length];
  }
}

export default AIPlayer;
