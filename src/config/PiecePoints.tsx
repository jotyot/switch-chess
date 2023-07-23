// [points to the capturer, points to the captured]

/**
 * Maps a piece ("Pawn", etc) to [points the capturer gets, points the captured gets]
 */
const PiecePoints = new Map<string, [number, number]>([
  ["Pawn", [4, 0]],
  ["Bishop", [2, 0]],
  ["Knight", [2, 0]],
  ["Rook", [3, 0]],
  ["Queen", [4, 0]],
  ["King", [5, 0]],
  ["SuperPawn", [1, 1]],
]);

export default PiecePoints;
