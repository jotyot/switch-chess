import PieceQueueUI from "./PieceQueueUI";
import Hand from "../classes/Hand";
import Colors from "../config/Colors";

interface Props {
  hand: Hand;
  onClick: (white: boolean, index: number) => void;
  width: number;
  white: boolean;
}

function PlayerUI({ white, width, hand, onClick }: Props) {
  const pieceColor = white ? "White" : "Black";
  return (
    <div
      className="container position-relative rounded my-2"
      style={{
        width: width + "px",
        height: width / 3 + "px",
        backgroundColor: Colors.primary,
      }}
    >
      <div className="row position-absolute translate-middle-x start-50 top-50">
        {hand.getHand().map((piece, index) => {
          const scale = hand.getSelected() === index ? 0.25 : 0.18;
          return (
            <PieceQueueUI
              squareSize={width * scale}
              image={pieceColor + piece}
              onClick={() => onClick(white, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlayerUI;
