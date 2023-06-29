import PieceQueueUI from "./PieceQueueUI";

interface Props {
  width: number;
  white: boolean;
  onClick: () => void;
  pieceQueue: string[];
}

function PlayerUI({ white, width, pieceQueue, onClick }: Props) {
  const pieceColor = white ? "White" : "Black";
  return (
    <div
      className="container position-relative bg-info rounded my-2"
      style={{ width: width + "px", height: width / 3 + "px" }}
    >
      <div className="row position-absolute top-50 end-50 translate-middle-y px-3">
        <PieceQueueUI
          squareSize={width / 4}
          color={"info-subtle"}
          image={pieceColor + pieceQueue[0]}
          onClick={onClick}
        />
      </div>
      <div className="row position-absolute top-50 start-50 translate-middle-y px-3">
        <PieceQueueUI
          squareSize={width / 6}
          color={"info-subtle"}
          image={pieceColor + pieceQueue[1]}
          extraClasses=""
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default PlayerUI;
