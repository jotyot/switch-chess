// [points to the capturer, points to the captured]

/**
 * Maps a piece ("Pawn", etc) to [points the capturer gets, points the captured gets]
 */
const PiecePoints = new Map<string, [number, number]>([
  ["Pawn", [5, 0]],
  ["Bishop", [4, 0]],
  ["Knight", [4, 0]],
  ["Rook", [3, 0]],
  ["Queen", [1, 0]],
  ["King", [1, 0]],
  ["SuperPawn", [1, 1]],
]);

export default PiecePoints;
