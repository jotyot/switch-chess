const PossiblePieces = ["Pawn", "Rook", "Bishop", "Knight", "Queen", "King"];

class PieceQueue {
  private queue: string[] = PieceQueue.shuffledPieces();

  /**
   * Gets the front of the PieceQueue and removes it, shifting everything else forward
   * @returns the front string of the queue
   */
  public popQueue(): string {
    if (this.queue.length === 1)
      this.queue = [...this.queue, ...PieceQueue.shuffledPieces()];
    let piece = this.queue.shift() || "Pawn";
    return piece;
  }
  public static getRandomPiece = () =>
    PossiblePieces[~~(Math.random() * PossiblePieces.length)];

  /**
   * 10 pieces, but never have 2 knights in a row
   * @returns array of string
   */
  public static shuffledPieces = () => {
    let array = [PieceQueue.getRandomPiece()];
    for (let i = 1; i < 10; i++) {
      let piece = PieceQueue.getRandomPiece();
      while (array[i - 1] === "Knight" && piece === "Knight")
        piece = PieceQueue.getRandomPiece();
      array[i] = piece;
    }
    return array;
  };
}

export default PieceQueue;
