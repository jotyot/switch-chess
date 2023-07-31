const PossiblePieces = ["Pawn", "Rook", "Bishop", "Knight", "Queen", "King"];

class PieceQueue {
  // private queue: string[] = PieceQueue.shuffledPieces();

  /**
   * Gets the front of the PieceQueue and removes it, shifting everything else forward
   * @returns the front string of the queue
   */
  public popQueue(): string {
    // if (this.queue.length === 1)
    //   this.queue = [...this.queue, ...PieceQueue.shuffledPieces()];
    // let piece = this.queue.shift() || "Pawn";
    // return piece;
    return PieceQueue.getRandomPiece();
  }
  public static getRandomPiece = () =>
    PossiblePieces[~~(Math.random() * PossiblePieces.length)];

  public static shuffledPieces = () => {
    return PossiblePieces.slice(0).sort(() => 0.5 - Math.random());
  };
}

export default PieceQueue;
