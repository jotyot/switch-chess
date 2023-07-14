const PossiblePieces = ["Pawn", "Rook", "Bishop", "Knight", "Queen", "King"];

class PieceQueue {
  private queue: string[] = PieceQueue.shuffledPieces();

  public popQueue(): string {
    if (this.queue.length === 1)
      this.queue = [...this.queue, ...PieceQueue.shuffledPieces()];
    let piece = this.queue.shift();
    piece = piece ? piece : "Pawn"; // should never happen
    return piece;
  }
  public static getRandomPiece = () =>
    PossiblePieces[~~(Math.random() * PossiblePieces.length)];

  public static shuffledPieces = () => {
    return PossiblePieces.slice(0).sort(() => 0.5 - Math.random());
  };
}

export default PieceQueue;
