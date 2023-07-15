import HandUI from "./HandUI";
import Hand from "../classes/Hand";
import Colors from "../config/Colors";

interface Props {
  hand: Hand;
  onClick: (white: boolean, index: number) => void;
  score: number;
  width: number;
  white: boolean;
}

function PlayerUI({ score, white, width, hand, onClick }: Props) {
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
      <h1 className="position-absolute translate-middle-y top-50">{score}</h1>
      <div className="d-flex justify-content-center position-absolute translate-middle-x start-50 top-50">
        {hand.getHand().map((piece, index) => {
          const scale = hand.getSelected() === index ? 0.25 : 0.18;
          return (
            <HandUI
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
