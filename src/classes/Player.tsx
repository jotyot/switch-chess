class Player {
  isAlive: boolean = true;
  isWhite: boolean;
  position: number[];
  piece: string;

  constructor(isWhite: boolean, piece: string, [numRows, numCols]: number[]) {
    this.isWhite = isWhite;
    this.position = isWhite
      ? [numRows - 1, Math.floor(numCols / 2)]
      : [0, Math.floor(numCols / 2) - (numCols % 2 === 0 ? 1 : 0)];
    this.piece = piece;
  }

  public getPiece = () => this.piece;
  public setPiece(piece: string) {
    this.piece = piece;
  }

  public getPos = () => this.position;
  public setPos(position: number[]) {
    this.position = position;
  }

  public getAlive = () => this.isAlive;
  public die = () => (this.isAlive = false);
}

export default Player;
