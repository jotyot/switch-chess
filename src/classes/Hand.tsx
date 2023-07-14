import PieceQueue from "./PieceQueue";

class Hand {
  private pieceQueue = new PieceQueue();
  private hand = new Map<number, string>();
  private selected = 0;
  constructor(handSize: number) {
    for (let i = 0; i < handSize; i++) {
      this.hand.set(i, this.pieceQueue.popQueue());
    }
  }

  public setSelected = (index: number) => (this.selected = index);
  public popSelected(): string {
    // save output piece. Should never be null
    let piece = this.hand.get(this.selected);
    piece = piece ? piece : "Pawn";

    // change selected 'card' to something else, then change what 'card' is selected
    this.hand.set(this.selected, this.pieceQueue.popQueue());
    // this.selected += this.selected === 0 ? 1 : -1;

    return piece;
  }
  public getHand(): string[] {
    return [...this.hand.values()];
  }
  public getSelected = () => this.selected;
}
export default Hand;
