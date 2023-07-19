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

/**
 * An element that has information about the number of points a player has and information about a player's hand
 * @param hand instance of the Hand class
 * @param onClick a function that can be mapped to click of an individual "card"
 * @param score how many points this player has
 * @param width how wide in px the element is
 * @param white is this the white/black side?
 * @returns JSX element containing player information
 */
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
        {
          // Selected element is larger
          hand.getHand().map((piece, index) => {
            const scale = hand.getSelected() === index ? 0.25 : 0.18;
            return (
              <HandUI
                squareSize={width * scale}
                image={pieceColor + piece}
                onClick={() => onClick(white, index)}
                key={index}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default PlayerUI;
