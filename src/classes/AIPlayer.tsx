import BoardState from "./BoardState";
import Hand from "./Hand";
import PieceMoves from "./PieceMoves";
import PiecePoints from "../config/PiecePoints";
import AITraits from "./AITraits";

/** Contains functions for generating a move according to an ai player */
class AIPlayer {
  private boardState: React.MutableRefObject<BoardState>;
  private hand: React.MutableRefObject<Hand>;
  private traits: AITraits;
  private AISelectDelay = 300;
  private AIMoveDelay = 700;
  private inDanger = false;

  constructor(
    boardState: React.MutableRefObject<BoardState>,
    hand: React.MutableRefObject<Hand>,
    traits: AITraits
  ) {
    this.boardState = boardState;
    this.hand = hand;
    this.traits = traits;
  }

  /**
   * checks if the piece turned into something special given its position
   * @param piece piece
   * @param position position
   * @returns the piece, or another one if its position changed what kind of piece it is
   */

  /**
   * Gets the possible moves of the current player that won't get immediately captured
   * @remarks if the player can capture, the only possible move will reduce to that move
   * if the player can't avoid being captured, it returns the normal possible moveset.
   * @returns array of possible piece, move combos that won't get immediately captured
   */
  private basic(): [string, number, number][] {
    const board = this.boardState.current;
    const hand = this.hand.current;
    const other = board.getWhiteTurn() ? board.getBlack() : board.getWhite();
    let playerMoves = PieceMoves.movesFromBoardState(board, true, true);

    const otherPos = other.getPos();
    // If piece can capture player
    const [or, oc] = otherPos;
    let canCapture = false;
    playerMoves.forEach(([r, c]) => {
      if (r === or && c === oc) canCapture = true;
    });
    if (canCapture) return hand.getHand().map((piece) => [piece, ...otherPos]);

    const otherMoves = PieceMoves.movesFromBoardState(board, false, false);
    /** Moves that dont overlap with opponenets move next turn */
    const safeMoves = this.safeMoves(playerMoves, otherMoves);
    if (safeMoves.length > 0) {
      playerMoves = safeMoves;
      this.inDanger = false;
    } else {
      this.inDanger = true;
      console.log("danger");
    }

    let pieceMoves: [string, number, number][] = [];
    for (const piece of hand.getHand()) {
      pieceMoves = [
        ...pieceMoves,
        ...playerMoves.map((move): [string, number, number] => [
          piece,
          ...move,
        ]),
      ];
    }
    return pieceMoves;
  }

  /**
   * given a list of moves, either returns the set of moves that can checkmate
   * or the orignal list if it is empty
   * @param moves a piece, move combination
   * @returns a set of moves that can checkmate or the original moves
   */
  private checkmater(
    moves: [string, number, number][]
  ): [string, number, number][] {
    if (moves.length === 1) return moves;

    const board = this.boardState.current;
    const [player, other] = board.getWhiteTurn()
      ? [board.getWhite(), board.getBlack()]
      : [board.getBlack(), board.getWhite()];

    let outMoves: [string, number, number][] = [];

    /**
     * for every piece, for every move, it checks if
     * it can limit the other's safe moves to 0
     */
    for (const pieceMove of moves) {
      let piece = pieceMove[0];
      let move: [number, number] = [pieceMove[1], pieceMove[2]];
      piece = PieceMoves.specialPieces(
        piece,
        move,
        board.getBoardSize(),
        board.getWhiteTurn()
      );

      const otherMoves = PieceMoves.moves(
        other.getPiece(),
        other.getPos(),
        move,
        board.getBoardSize(),
        other.getIsWhite(),
        true
      );
      const nextMoves = PieceMoves.moves(
        piece,
        move,
        other.getPos(),
        board.getBoardSize(),
        player.getIsWhite(),
        false
      );
      if (this.safeMoves(otherMoves, nextMoves).length < 1)
        outMoves.push(pieceMove);
    }
    if (outMoves.length < 1) outMoves = moves;
    return outMoves;
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

  /**
   * swaps pieces to minimize point loss. may move in order to turn into
   * a less point-loss piece
   * @param moves a piece, move combination
   * @returns an array of a single best move or moves
   */
  private minimizeLoss(
    moves: [string, number, number][]
  ): [string, number, number][] {
    const board = this.boardState.current;

    const hand = this.hand.current;
    const handStrings = hand.getHand();

    const currentPiece = handStrings[hand.getSelected()];
    const currentLoss = (PiecePoints.get(currentPiece) || [0])[0];

    let minLoss = currentLoss;
    let outMoves: [string, number, number][] = [];

    for (const pieceMove of moves) {
      const piece = pieceMove[0];
      const move: [number, number] = [pieceMove[1], pieceMove[2]];

      const finalPiece = PieceMoves.specialPieces(
        piece,
        move,
        board.getBoardSize(),
        board.getWhiteTurn()
      );
      const points = (PiecePoints.get(finalPiece) || [0])[0];

      if (points < minLoss) {
        outMoves = [pieceMove];
        minLoss = points;
      } else if (points === minLoss) outMoves.push(pieceMove);
    }
    return outMoves;
  }

  /**
   * reduces the moveset to those that preserve the same piece as the one selected
   * @param moves a piece, move combination
   * @returns the same moveset or a smaller, non empty one
   */
  private switchAverse(
    moves: [string, number, number][]
  ): [string, number, number][] {
    const hand = this.hand.current;
    const currentPiece = hand.getHand()[hand.getSelected()];

    let outMoves = moves.filter((pieceMove) => pieceMove[0] === currentPiece);
    if (outMoves.length < 1) outMoves = moves;
    return outMoves;
  }

  /**
   * Chooses a random move from a moveset
   * @param moves a piece, move combination
   * @returns one position randomly chosen from the possible moves
   */
  private randomMove(moves: [string, number, number][]) {
    return moves[~~(Math.random() * moves.length)];
  }

  /** Generates an AI move and moves the pieces on the board accordingly after a delay. */
  public makeAIMove(): void {
    let moves = this.basic();

    if (this.traits.checkmater) moves = this.checkmater(moves);
    if (this.inDanger) moves = this.minimizeLoss(moves);
    if (this.traits.switchAverse) moves = this.switchAverse(moves);
    const pieceMove = this.randomMove(moves);

    const piece = pieceMove[0];
    const move: [number, number] = [pieceMove[1], pieceMove[2]];

    const board = this.boardState.current;
    const hand = this.hand.current;

    if (piece !== hand.getHand()[hand.getSelected()]) {
      setTimeout(
        () => hand.setSelected(hand.getHand().indexOf(piece)),
        this.AISelectDelay
      );
    }
    if (move !== null) {
      setTimeout(
        () => board.attemptMove(move, () => hand.popSelected()),
        this.AIMoveDelay
      );
    }
  }
}

export default AIPlayer;
