import BoardState from "./BoardState";
import Hand from "./Hand";
import PieceMoves from "./PieceMoves";
import PiecePoints from "../config/PiecePoints";

/** Contains functions for generating a move according to an ai player */
class AIPlayer {
  private boardState: React.MutableRefObject<BoardState>;
  private hand: React.MutableRefObject<Hand>;
  private AISelectDelay = 300;
  private AIMoveDelay = 300;
  private inDanger = false;
  constructor(
    boardState: React.MutableRefObject<BoardState>,
    hand: React.MutableRefObject<Hand>
  ) {
    this.boardState = boardState;
    this.hand = hand;
  }

  /**
   * Gets the possible moves of the current player that won't get immediately captured
   * @remarks if the player can capture, the only possible move will reduce to that move
   * if the player avoid being captured, it returns the normal possible moveset.
   * @returns array of possible positions that won't get immediately captured
   */
  private basicMoves(): [number, number][] {
    const board = this.boardState.current;
    const other = board.getWhiteTurn() ? board.getBlack() : board.getWhite();
    let playerMoves = PieceMoves.movesFromBoardState(board, true);

    const otherPos = other.getPos();
    // If piece can capture player
    const [or, oc] = otherPos;
    let canCapture = false;
    playerMoves.forEach(([r, c]) => {
      if (r === or && c === oc) canCapture = true;
    });
    if (canCapture) return [otherPos];

    const otherMoves = PieceMoves.movesFromBoardState(board, false);
    /** Moves that dont overlap with opponenets move next turn */
    const safeMoves = this.safeMoves(playerMoves, otherMoves);
    if (safeMoves.length > 0) {
      playerMoves = safeMoves;
      this.inDanger = false;
    } else this.inDanger = true;

    return playerMoves;
  }

  /**
   * Chooses a random move that wont get immediately captured or the winning move if possible
   * @param boardState instance of boardState class
   * @returns one position randomly chosen from the possible moves
   */
  private randomMove() {
    const moves = this.basicMoves();

    return moves[~~(Math.random() * moves.length)];
  }

  /**
   * gets all the playerMoves that don't overlap with otherMoves
   * @param playerMoves array of players possible moves
   * @param otherMoves array of others possible moves
   * @returns list of save moves. could be empty
   */
  private safeMoves(
    playerMoves: [number, number][],
    otherMoves: [number, number][]
  ) {
    return playerMoves.filter(([r, c]) => {
      let notOverlap = true;
      otherMoves.forEach(([or, oc]) => {
        if (r === or && c === oc) notOverlap = false;
      });
      return notOverlap;
    });
  }

  /** Generates an AI move and moves the pieces on the board accordingly after a delay. */
  public makeAIMove(): void {
    const board = this.boardState.current;
    const hand = this.hand.current;

    const AIMove = this.randomMove();

    this.minimizeLoss();

    if (AIMove !== null) {
      setTimeout(() => {
        board.attemptMove(AIMove, () => hand.popSelected());
      }, this.AISelectDelay + this.AIMoveDelay);
    }
  }

  /** If going to lose, switches pieces to minimize loss */
  private minimizeLoss(): void {
    const hand = this.hand.current;
    if (this.inDanger) {
      const handStrings = hand.getHand();
      /** Converted hand to its corresponding point value to opponent */
      const handToPoints = handStrings.map(
        (piece) => (PiecePoints.get(piece) || [0, 0])[0]
      );
      /** The index of the handToPoints that matches the min number of handToPoints */
      const index = handToPoints.findIndex(
        (num) => num === Math.min(...handToPoints)
      );
      setTimeout(() => hand.setSelected(index), this.AISelectDelay);
    }
  }
}

export default AIPlayer;
