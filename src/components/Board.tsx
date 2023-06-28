import Square from "./Square";
import BoardState from "../classes/BoardState";
import Piece from "./Piece";

interface Props {
  boardState: BoardState;
  squareSize: number;
  onClick: (i: number, j: number) => void;
}

function Board({ squareSize, boardState, onClick }: Props) {
  const highlighted = true;

  const [numRows, numCols] = boardState.getBoardSize();
  const highlights: boolean[][] = highlighted
    ? boardState.getBoardHighlights()
    : [...Array(numRows)].fill(Array(numCols).fill(false));

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
