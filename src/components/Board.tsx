import Square from "./Square";
import BoardState from "../classes/BoardState";
import Piece from "./Piece";

interface Props {
  boardState: BoardState;
  squareSize: number;
  onClick: (i: number, j: number) => void;
}

/**
 * A grid of squares with players that reflect the boardState.
 * @param squareSize number of px the squares on the board are
 * @param boardState a boardState class instance
 * @param onClick a function that can be mapped to an individual square
 * @returns A JSX element containing information about the state of the chess board + pieces
 */
function Board({ squareSize, boardState, onClick }: Props) {
  const numCols = boardState.getBoardSize()[1];
  const highlights: boolean[][] = boardState.getBoardHighlights();

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
              return (
                <Square
                  squareSize={squareSize}
                  color={(i + j) % 2 === 0 ? "light" : "dark"}
                  highlights={item}
                  onClick={() => onClick(i, j)}
                  key={j}
                />
              );
            })}
          </div>
        );
      })}
      <Piece player={boardState.getWhite()} squareSize={squareSize} />
      <Piece player={boardState.getBlack()} squareSize={squareSize} />
    </div>
  );
}

export default Board;
