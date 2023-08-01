import BoardState from "./BoardState";
import Hand from "./Hand";
import PieceMoves from "./PieceMoves";
import PiecePoints from "../config/PiecePoints";
import AITraits from "./AITraits";
import Player from "./Player";

/** Contains functions for generating a move according to an ai player */
class AIPlayer {
  private board: BoardState;
  private hand: Hand;
  private otherHand: Hand;
  private traits: AITraits;
  private AISelectDelay = 300;
  private AIMoveDelay = 700;
  private score: [number, number];
  private winScore: number;

  constructor(
    board: React.MutableRefObject<BoardState>,
    hand: React.MutableRefObject<Hand>,
    otherHand: React.MutableRefObject<Hand>,
    traits: AITraits,
    score: [number, number],
    winScore: number
  ) {
    this.board = board.current;
    this.hand = hand.current;
    this.otherHand = otherHand.current;
    this.traits = traits;
    this.score = score;
    this.winScore = winScore;
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
  private basic(): [string, [number, number]][] {
    const [player, other] = this.board.getWhiteTurn()
      ? [this.board.getWhite(), this.board.getBlack()]
      : [this.board.getBlack(), this.board.getWhite()];
    const playerSafeMoves = this.safePieceMoves(
      player,
      other.getPos(),
      other.getPiece(),
      true,
      false
    );
    // if get the list of moves that are just on top of the other position
    const [or, oc] = other.getPos();
    const captureMoves = playerSafeMoves.filter((pieceMove) => {
      const [r, c] = pieceMove[1];
      return r === or && c === oc;
    });

    // if can capture
    if (captureMoves.length > 0) {
      // if capturing will make lose, remove the move from the set
      if (this.noCapture())
        return playerSafeMoves.filter((pieceMove) => {
          const [r, c] = pieceMove[1];
          return !(r === or && c === oc);
        });
      // else just capture
      else return captureMoves;
    } // else just return a safe move
    console.log("playerSafeMoves");
    console.log(playerSafeMoves);
    return playerSafeMoves;
  }

  /**
   * if by capturing the piece, the other player will win, returns true
   * @returns true/false
   */
  private noCapture(): boolean {
    const other = this.board.getWhiteTurn()
      ? this.board.getBlack()
      : this.board.getWhite();
    const otherScore = this.score[0];
    const captureScore = (PiecePoints.get(other.getPiece()) || [0, 0])[1];

    return otherScore + captureScore >= this.winScore;
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
   * given a list of moves, either returns the set of moves that can checkmate
   * or the orignal list if it is empty
   * @param moves a piece, move combination
   * @returns a set of moves that can checkmate or the original moves
   */
  private checkmater(
    moves: [string, [number, number]][]
  ): [string, [number, number]][] {
    if (moves.length === 1) return moves;

    const other = this.board.getWhiteTurn()
      ? this.board.getBlack()
      : this.board.getWhite();

    let outMoves = this.checkmateMoves(
      moves,
      !other.getIsWhite(),
      other.getPos(),
      other.getPiece()
    );
    console.log("checkmater");
    console.log(outMoves);
    if (outMoves.length < 1) outMoves = moves;
    return outMoves;
  }

  /**
   * within input moveset, gets the set of moves that will checkmate the other
   * @param moves input moveset
   * @param isWhite is the player white?
   * @param otherPos the pos of opponent that may be mated
   * @param otherPiece the piece of opp that may be mated
   * @returns
   */
  private checkmateMoves(
    moves: [string, [number, number]][],
    isWhite: boolean,
    otherPos: [number, number],
    otherPiece: string
  ) {
    let checkmates: [string, [number, number]][] = [];

    /**
     * for every piece, for every move, it checks if
     * it can limit the other's safe moves to 0
     */
    for (const pieceMove of moves) {
      let move = pieceMove[1];
      const piece = PieceMoves.specialPieces(
        pieceMove[0],
        move,
        this.board.getBoardSize(),
        isWhite
      );
      const otherMoves = PieceMoves.moves(
        otherPiece,
        otherPos,
        move,
        this.board.getBoardSize(),
        !isWhite,
        true
      );
      const nextMoves = PieceMoves.moves(
        piece,
        move,
        otherPos,
        this.board.getBoardSize(),
        isWhite,
        false
      );
      if (
        otherMoves.length > 0 &&
        this.safeMoves(otherMoves, nextMoves).length < 1
      )
        checkmates.push(pieceMove);
    }
    return checkmates;
  }

  private mateDefensive(
    moves: [string, [number, number]][]
  ): [string, [number, number]][] {
    const other = this.board.getWhiteTurn()
      ? this.board.getBlack()
      : this.board.getWhite();

    const mateDefensiveMoves = moves.filter((pieceMove) => {
      const move = pieceMove[1];
      const piece = PieceMoves.specialPieces(
        pieceMove[0],
        move,
        this.board.getBoardSize(),
        !other.getIsWhite()
      );
      const otherMoves = this.safePieceMoves(other, move, piece, false, true);
      return (
        this.checkmateMoves(otherMoves, other.getIsWhite(), move, piece)
          .length < 1
      );
    });
    console.log("mateDefensiveMoves");
    console.log(mateDefensiveMoves);
    return mateDefensiveMoves.length > 0 ? mateDefensiveMoves : moves;
  }

  /**
   * given the player, and the other's piece and position
   * return a list of safe piece move combos
   * @param player the player's whos move combos you're finding out
   * @param otherPos the pos of player that treatens this moveset
   * @param otherPiece the piece of player that threatens this moveset
   * @param isPlayer is this the player's or the other's moves
   * @param strict if there is no safe move, should this list be empty?
   * @returns
   */
  private safePieceMoves(
    player: Player,
    otherPos: [number, number],
    otherPiece: string,
    isPlayer: boolean,
    strict: boolean
  ): [string, [number, number]][] {
    const playerMoves = PieceMoves.moves(
      player.getPiece(),
      player.getPos(),
      otherPos,
      this.board.getBoardSize(),
      player.getIsWhite(),
      true
    );
    const otherMoves = PieceMoves.moves(
      otherPiece,
      otherPos,
      player.getPos(),
      this.board.getBoardSize(),
      !player.getIsWhite(),
      false
    );
    const safeMoves = this.safeMoves(playerMoves, otherMoves);
    const finalMoves = strict || safeMoves.length > 0 ? safeMoves : playerMoves;

    const hand = isPlayer ? this.hand : this.otherHand;
    let pieceMoves: [string, [number, number]][] = [];
    for (const piece of hand.getHand()) {
      pieceMoves = [
        ...pieceMoves,
        ...finalMoves.map((move): [string, [number, number]] => [piece, move]),
      ];
    }
    return pieceMoves;
  }

  private dangerCheck(): boolean {
    const playerMoves = PieceMoves.movesFromBoardState(this.board, true, true);
    const otherMoves = PieceMoves.movesFromBoardState(this.board, false, false);
    return this.safeMoves(playerMoves, otherMoves).length < 1;
  }

  /**
   * swaps pieces to minimize point loss. may move in order to turn into
   * a less point-loss piece
   * @param moves a piece, move combination
   * @returns an array of a single best move or moves
   */
  private minimizeLoss(
    moves: [string, [number, number]][]
  ): [string, [number, number]][] {
    const handStrings = this.hand.getHand();

    const currentPiece = handStrings[this.hand.getSelected()];

    let minLoss = (PiecePoints.get(currentPiece) || [10])[0];
    let outMoves: [string, [number, number]][] = [];

    for (const pieceMove of moves) {
      const piece = pieceMove[0];
      const move = pieceMove[1];

      const finalPiece = PieceMoves.specialPieces(
        piece,
        move,
        this.board.getBoardSize(),
        this.board.getWhiteTurn()
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
    moves: [string, [number, number]][]
  ): [string, [number, number]][] {
    const currentPiece = this.hand.getHand()[this.hand.getSelected()];

    let outMoves = moves.filter((pieceMove) => pieceMove[0] === currentPiece);
    if (outMoves.length < 1) outMoves = moves;
    return outMoves;
  }

  /**
   * Chooses a random move from a moveset
   * @param moves a piece, move combination
   * @returns one position randomly chosen from the possible moves
   */
  private randomMove(moves: [string, [number, number]][]) {
    return moves[~~(Math.random() * moves.length)];
  }

  /** Generates an AI move and moves the pieces on the board accordingly after a delay. */
  public makeAIMove(): void {
    let moves = this.basic();

    if (this.traits.checkmater) moves = this.checkmater(moves);
    if (this.traits.mateDefensive) moves = this.mateDefensive(moves);
    if (this.dangerCheck()) moves = this.minimizeLoss(moves);
    if (this.traits.switchAverse) moves = this.switchAverse(moves);
    const pieceMove = this.randomMove(moves);

    const piece = pieceMove[0];
    const move = pieceMove[1];

    if (piece !== this.hand.getHand()[this.hand.getSelected()]) {
      setTimeout(
        () => this.hand.setSelected(this.hand.getHand().indexOf(piece)),
        this.AISelectDelay
      );
    }
    if (move !== null) {
      setTimeout(
        () => this.board.attemptMove(move, () => this.hand.popSelected()),
        this.AIMoveDelay
      );
    }
  }
}

export default AIPlayer;
