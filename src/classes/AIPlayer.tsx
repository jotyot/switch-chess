import BoardState from "./BoardState";
import Hand from "./Hand";
import PieceMoves from "./PieceMoves";
import PiecePoints from "../config/PiecePoints";

/** Contains functions for generating a move according to an ai player */
class AIPlayer {
  private boardState: React.MutableRefObject<BoardState>;
  private hand: React.MutableRefObject<Hand>;
  private AISelectDelay = 500;
  private AIMoveDelay = 600;
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
    let playerMoves = PieceMoves.movesFromBoardState(board, true, true);

    const otherPos = other.getPos();
    // If piece can capture player
    const [or, oc] = otherPos;
    let canCapture = false;
    playerMoves.forEach(([r, c]) => {
      if (r === or && c === oc) canCapture = true;
    });
    if (canCapture) return [otherPos];

    const otherMoves = PieceMoves.movesFromBoardState(board, false, false);
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
  private randomMove(moves: [number, number][]) {
    return moves[~~(Math.random() * moves.length)];
  }

  /**
   * basic moves as the base, then out of those, chooses one that will
   * mate the other
   * @returns the winning move, the checkmate move, or a larger list
   */
  private mateMoves(): [number, number][] {
    const moves = this.basicMoves();
    if (moves.length === 1) return moves;

    const board = this.boardState.current;
    const hand = this.hand.current;
    const [player, other] = board.getWhiteTurn()
      ? [board.getWhite(), board.getBlack()]
      : [board.getBlack(), board.getWhite()];

    const otherMoves = PieceMoves.movesFromBoardState(board, false, true);
    const handStrings = hand.getHand();

    const numRows = board.getBoardSize()[0];

    /**
     * for every piece, for every move, it checks if
     * it can limit the other's safe moves to 0
     */
    for (let i = 0; i < handStrings.length; i++) {
      for (let j = 0; j < moves.length; j++) {
        let piece = handStrings[i];

        // superpawn check
        if (
          piece === "Pawn" && player.getIsWhite()
            ? moves[j][0] === 0
            : moves[j][0] === numRows - 1
        ) {
          piece = "SuperPawn";
        }

        const nextMoves = PieceMoves.moves(
          piece,
          moves[j],
          other.getPos(),
          board.getBoardSize(),
          player.getIsWhite(),
          false
        );
        const otherSafeMoves = this.safeMoves(otherMoves, nextMoves);

        if (otherSafeMoves.length < 1 && i !== hand.getSelected()) {
          setTimeout(() => hand.setSelected(i), this.AISelectDelay);
          return [moves[j]];
        }
      }
    }

    return moves;
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

    // insert main logic here

    let movePool = this.mateMoves();

    if (this.inDanger) movePool = this.minimizeLoss(movePool);

    const AIMove = this.randomMove(movePool);

    if (AIMove !== null) {
      setTimeout(() => {
        board.attemptMove(AIMove, () => hand.popSelected());
      }, this.AIMoveDelay);
    }
  }

  /**
   * If going to get captured, but already moved, switches pieces to minimize loss
   * prolly should take a list of moves and sees if it can superpawn
   */
  private minimizeLoss(moves: [number, number][]): [number, number][] {
    const board = this.boardState.current;
    const hand = this.hand.current;
    const handStrings = hand.getHand();

    const player = board.getWhiteTurn() ? board.getWhite() : board.getBlack();

    const currentPiece = handStrings[hand.getSelected()];
    const currentLoss = (PiecePoints.get(currentPiece) || [0])[0];

    let minLoss = 9999;
    let minPiece = currentPiece;
    let outMoves: [number, number][] = [];

    const numRows = board.getBoardSize()[0];

    for (let i = 0; i < handStrings.length; i++) {
      for (let j = 0; j < moves.length; j++) {
        let piece = handStrings[i];
        if (
          piece === "Pawn" && player.getIsWhite()
            ? moves[j][0] === 0
            : moves[j][0] === numRows - 1
        ) {
          piece = "SuperPawn";
        }
        const points = (PiecePoints.get(piece) || [0])[0];
        if (points < minLoss) {
          outMoves = [moves[j]];
          minLoss = points;
          minPiece = handStrings[i];
        } else if (points === minLoss) outMoves.push(moves[j]);
      }
    }

    if (minLoss !== currentLoss)
      setTimeout(
        () => hand.setSelected(handStrings.indexOf(minPiece)),
        this.AISelectDelay
      );
    return outMoves;
  }
}

export default AIPlayer;
