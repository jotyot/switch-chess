const PossiblePieces = ["Pawn", "Rook", "Bishop", "Knight", "Queen", "King"];

class PieceQueue {
  blackQueue: string[] = PieceQueue.shuffledPieces();
  whiteQueue: string[] = PieceQueue.shuffledPieces();

  public getWhiteQueue = () => this.whiteQueue;
  public getBlackQueue = () => this.blackQueue;

  public getNextWhite() {
    if (this.whiteQueue.length === 2)
      this.whiteQueue = [...this.whiteQueue, ...PieceQueue.shuffledPieces()];
    return this.whiteQueue.shift();
  }
  public getNextBlack() {
    if (this.blackQueue.length === 2)
      this.blackQueue = [...this.blackQueue, ...PieceQueue.shuffledPieces()];
    return this.blackQueue.shift();
  }

  public swapWhite = () =>
    ([this.whiteQueue[0], this.whiteQueue[1]] = [
      this.whiteQueue[1],
      this.whiteQueue[0],
    ]);

  public swapBlack = () =>
    ([this.blackQueue[0], this.blackQueue[1]] = [
      this.blackQueue[1],
      this.blackQueue[0],
    ]);

  public static getRandomPiece = () =>
    PossiblePieces[~~(Math.random() * PossiblePieces.length)];

  public static shuffledPieces = () => {
    return PossiblePieces.slice(0).sort(() => 0.5 - Math.random());
  };
}

export default PieceQueue;
