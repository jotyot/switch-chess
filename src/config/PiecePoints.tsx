// [points to the capturer, points to the captured]

/**
 * Maps a piece ("Pawn", etc) to [points the capturer gets, points the captured gets]
 */
const PiecePoints = new Map<string, [number, number]>([
  ["Pawn", [3, 0]],
  ["Bishop", [1, 0]],
  ["Knight", [1, 0]],
  ["Rook", [2, 0]],
  ["Queen", [3, 0]],
  ["King", [4, 0]],
  ["SuperPawn", [1, 1]],
]);

export default PiecePoints;
