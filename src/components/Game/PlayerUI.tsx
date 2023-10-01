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
  color: string;
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
function PlayerUI({
  score,
  white,
  width,
  hand,
  onClick,
  skinID,
  color,
}: Props) {
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

  const transition = {
    transitionProperty: "all",
    transitionDuration: "0.5s",
  };

  return (
    <div className="d-flex justify-content-center position-relative my-2 ">
      <div
        className="position-relative d-flex justify-content-center rounded align-items-center"
        style={{
          marginRight: 7 + "px",
          width: 63 + "px",
          height: width / 3 + "px",
          backgroundColor: white ? Colors.light : Colors.dark,
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: white ? Colors.dark : Colors.light,
          ...transition,
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: white ? Colors.dark : Colors.light,
            ...transition,
          }}
        >
          {score}
        </div>
      </div>
      <div
        className="position-relative rounded d-flex justify-content-center align-items-center"
        style={{
          width: width - 70 + "px",
          height: width / 3 + "px",
          backgroundColor: color,
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: Colors.dark,
          ...transition,
        }}
      >
        <div className="d-flex">
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
    </div>
  );
}

export default PlayerUI;
