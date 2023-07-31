import HandUI from "./HandUI";
import Hand from "../../classes/Hand";
import Colors from "../../config/Colors";
import Timings from "../../config/Timings";
import { useState } from "react";

interface Props {
  hand: Hand;
  onClick: (white: boolean, index: number) => void;
  score: number;
  skinID: string;
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
function PlayerUI({ score, white, width, hand, onClick, skinID }: Props) {
  const pieceColor = white ? "White" : "Black";
  const bigScale = 0.25;
  const smallScale = 0.18;

  const [animate, setAnimate] = useState(false);

  const popStart = Timings.moveDuration + Timings.popDelay;

  function animation() {
    setTimeout(() => setAnimate(true), popStart);
    setTimeout(() => setAnimate(false), popStart + Timings.popDuration);
  }

  hand.setAnimation(animation);

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
            const selected = hand.getSelected() === index;
            const scale = selected ? bigScale : smallScale;
            return (
              <HandUI
                skinID={skinID}
                maxWidth={width * bigScale}
                squareSize={width * scale}
                image={pieceColor + piece}
                onClick={() => onClick(white, index)}
                key={index}
                animate={selected && animate}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default PlayerUI;
