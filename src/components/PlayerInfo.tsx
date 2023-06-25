import Square from "./Square";

interface Props {
  width: number;
  white: boolean;
  pieceQueue: string[];
}

function PlayerInfo({ white, width, pieceQueue }: Props) {
  const pieceColor = white ? "White" : "Black";
  return (
    <div
      className="container position-relative bg-info rounded my-2"
      style={{ width: width + "px", height: width / 3 + "px" }}
    >
      <div className="row d-flex align-items-center position-absolute top-50 start-0 translate-middle-y px-4">
        <Square
          squareSize={width / 4}
          color={"info-subtle"}
          image={pieceColor + pieceQueue[0]}
        />
        <Square
          squareSize={width / 6}
          color={"info-subtle"}
          image={pieceColor + pieceQueue[1]}
          extraClasses="mx-2"
        />
      </div>
      <div className="row d-flex align-items-center position-absolute top-50 end-0 translate-middle-y px-4">
        <Square
          squareSize={width / 4}
          color={"info-subtle"}
          image={pieceColor + ""}
        />
      </div>
    </div>
  );
}

export default PlayerInfo;
