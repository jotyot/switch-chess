import Square from "./Square";
import BoardState from "../../classes/BoardState";
import Piece from "./Piece";
import { useState } from "react";
import PieceMoves from "../../classes/PieceMoves";

interface Props {
  boardState: BoardState;
  flipped: boolean;
  playerSkinID: string;
  otherSkinID: string;
  width: number;
  handleBoardClick: (i: number, j: number) => void;
  whitePlayer: boolean;
}

/**
 * A grid of squares with players that reflect the boardState.
 * @param squareSize number of px the squares on the board are
 * @param boardState a boardState class instance
 * @param handleBoardClick a function that can be mapped to an individual square
 * @returns A JSX element containing information about the state of the chess board + pieces
 */
function Board({
  width,
  boardState,
  flipped,
  handleBoardClick,
  playerSkinID,
  otherSkinID,
  whitePlayer,
}: Props) {
  const [numRows, numCols] = boardState.getBoardSize();
  const squareSize = width / numCols;
  const playerMoves = PieceMoves.movesFromBoardState(boardState, true, true);

  const empty = [...Array(numRows)].map(() => Array(numCols).fill(false));
  let highlights = PieceMoves.movesToMap(playerMoves, [numRows, numCols]);
  if (flipped) highlights = highlights.map((row) => row.reverse()).reverse();
  const [guides, setGuides] = useState(empty);

  const whiteSkinID = whitePlayer ? playerSkinID : otherSkinID;
  const blackSkinID = whitePlayer ? otherSkinID : playerSkinID;

  /**
   * sets the current highlights to those of the piece we are hovering
   * @param isWhite are we getting the guides of the white piece?
   */
  function showGuides(isWhite: boolean): void {
    const isPlayer = boardState.getWhiteTurn() ? isWhite : !isWhite;
    const moves = PieceMoves.movesFromBoardState(
      boardState,
      isPlayer,
      isPlayer
    );

    let guides = PieceMoves.movesToMap(moves, [numRows, numCols]);
    if (flipped) guides = guides.map((row) => row.reverse()).reverse();
    setGuides(guides);
  }

  const white = boardState.getWhite();
  const black = boardState.getBlack();
  const captureable = (pos: [number, number]) =>
    playerMoves.some((m) => m[0] === pos[0] && m[1] === pos[1]);

  return (
    <div
      className="container position-relative"
      style={{
        width: squareSize * numCols + "px",
      }}
    >
      {highlights.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((item, j) => {
              const r = flipped ? numRows - i - 1 : i;
              const c = flipped ? numCols - j - 1 : j;

              return (
                <Square
                  squareSize={squareSize}
                  color={
                    (r + c) % 2 === 0
                      ? whiteSkinID + "White"
                      : blackSkinID + "Black"
                  }
                  clickable={item}
                  onClick={() => handleBoardClick(r, c)}
                  guides={guides[i][j]}
                  key={j}
                />
              );
            })}
          </div>
        );
      })}
      <Piece
        skinID={whiteSkinID}
        player={white}
        squareSize={squareSize}
        flipped={flipped}
        boardSize={[numRows, numCols]}
        onHover={() => showGuides(true)}
        offHover={() => setGuides(empty)}
        handleBoardClick={
          captureable(white.getPos()) ? handleBoardClick : undefined
        }
      />
      <Piece
        skinID={blackSkinID}
        player={black}
        squareSize={squareSize}
        flipped={flipped}
        boardSize={[numRows, numCols]}
        onHover={() => showGuides(false)}
        offHover={() => setGuides(empty)}
        handleBoardClick={
          captureable(black.getPos()) ? handleBoardClick : undefined
        }
      />
    </div>
  );
}

export default Board;
