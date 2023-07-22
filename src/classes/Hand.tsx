import PieceQueue from "./PieceQueue";

class Hand {
  private pieceQueue = new PieceQueue();
  private hand = new Map<number, string>();
  private selected = 0;
  private reRender: () => void;
  /** Exclusively used to the pop animation in PlayerUI */
  private animate = () => {};
  constructor(handSize: number, reRender: () => void) {
    for (let i = 0; i < handSize; i++) {
      this.hand.set(i, this.pieceQueue.popQueue());
    }
    this.reRender = reRender;
  }

  public setSelected = (index: number) => {
    if (index !== this.selected) {
      this.selected = index;
      this.reRender();
    }
  };

  /**
   * Gets the piece of the selected card and replaces it from the queue
   * @returns The piece of the selected card
   */
  public popSelected(): string {
    // save output piece. Should never be null
    let piece = this.hand.get(this.selected) || "Pawn";
    this.animate();
    // change selected 'card' to something else, then change what 'card' is selected
    this.hand.set(this.selected, this.pieceQueue.popQueue());
    return piece;
  }
  /**
   *
   * @returns An array of pieces order by position in the hand
   */
  public getHand(): string[] {
    return [...this.hand.values()];
  }
  public getSelected = () => this.selected;
  public setAnimation = (animate: () => void) => (this.animate = animate);
}
export default Hand;
