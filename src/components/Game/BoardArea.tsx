import BoardState from "../../classes/BoardState";
import Colors from "../../config/Colors";
import Board from "./Board";

interface Props {
  boardState: BoardState;
  flipped: boolean;
  playerSkinID: string;
  otherSkinID: string;
  width: number;
  handleBoardClick: (i: number, j: number) => void;
  whitePlayer: boolean;
}

function BoardArea({
  width,
  boardState,
  flipped,
  handleBoardClick,
  playerSkinID,
  otherSkinID,
  whitePlayer,
}: Props) {
  const margin = 25;
  const [numRows, _numCols] = boardState.getBoardSize();
  const border = width - margin;
  const borderWidth = 10;

  let numbers = [...Array(numRows).keys()];
  if (!flipped) numbers = numbers.reverse();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  let letters = alphabet.slice(0, numRows);
  if (flipped) letters = letters.reverse();

  const transition = {
    transitionProperty: "all",
    transitionDuration: "0.5s",
  };

  return (
    <div className="d-flex position-relative justify-content-center">
      <div
        className="justify-content-end d-flex rounded"
        style={{
          width: width + "px",
          height: width + "px",
          backgroundColor: whitePlayer ? Colors.light : Colors.dark,
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: whitePlayer ? Colors.dark : Colors.light,
          ...transition,
        }}
      >
        <div>
          {numbers.map((v) => (
            <div
              className="d-flex align-items-center justify-content-center"
              key={v}
              style={{
                fontSize: 15 + "px",
                fontWeight: "bold",
                color: whitePlayer ? Colors.dark : Colors.light,
                width: margin + "px",
                height: (border - borderWidth / 2) / numRows + "px",
                ...transition,
              }}
            >
              {v + 1}
            </div>
          ))}
        </div>
        <div
          className="position-relative"
          style={{
            width: border + "px",
            height: border + "px",
            backgroundColor: whitePlayer ? Colors.dark : Colors.light,
            borderRadius: "0px 0px 0px 5px",
            ...transition,
          }}
        >
          <div className="position-relative translate-middle top-50 start-50">
            <Board
              playerSkinID={playerSkinID}
              otherSkinID={otherSkinID}
              whitePlayer={whitePlayer}
              flipped={flipped}
              width={border - borderWidth}
              boardState={boardState}
              handleBoardClick={handleBoardClick}
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginTop: borderWidth - 2 + "px" }}
          >
            {letters.map((a) => (
              <div
                className="d-flex justify-content-center"
                key={a}
                style={{
                  fontSize: 14 + "px",
                  fontWeight: "bold",
                  color: whitePlayer ? Colors.dark : Colors.light,
                  width: (border - 6) / 4 + "px",
                  ...transition,
                }}
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardArea;
