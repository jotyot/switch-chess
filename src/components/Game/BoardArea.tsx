import BoardState from "../../classes/BoardState";
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
  return (
    <div>
      <Board
        playerSkinID={playerSkinID}
        otherSkinID={otherSkinID}
        whitePlayer={whitePlayer}
        flipped={flipped}
        width={width}
        boardState={boardState}
        handleBoardClick={handleBoardClick}
      />
    </div>
  );
}

export default BoardArea;
