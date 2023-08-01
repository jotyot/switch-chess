import ImageMap from "../../config/ImageMap";
import Colors from "../../config/Colors";
import Timings from "../../config/Timings";
import { useState } from "react";

interface Props {
  image: string;
  squareSize: number;
  skinID: string;
  onClick: () => void;
  maxWidth: number;
  animate?: boolean;
}
/**
 * An individual "card" of a hand
 * @param image "Pawn", "Knight", etc
 * @param squareSize length of one side in px
 * @param onClick a function that executes on click of an individual "card"
 * @returns A JSX element of an individual card
 */
function HandUI({
  maxWidth,
  image,
  squareSize,
  onClick,
  animate = false,
  skinID,
}: Props) {
  const incomingImage = image;
  const [imageName, setImageName] = useState(image);

  if (incomingImage !== imageName)
    setTimeout(
      () => setImageName(incomingImage),
      Timings.moveDuration + Timings.popDelay
    );

  const transition = {
    transitionProperty: "all",
    transitionTimingFunction: "ease-out",
  };

  return (
    <div
      className="d-flex justify-content-center rounded position-relative align-items-center"
      style={{
        height: maxWidth + "px",
        width: maxWidth + "px",
      }}
    >
      <div
        className="d-flex justify-content-center rounded position-relative align-items-center"
        style={{
          backgroundColor: Colors.tertiary,
          height: squareSize + "px",
          width: squareSize + "px",
          ...transition,
          transitionDuration: "0.05s",
        }}
        onClick={onClick}
      >
        {image && (
          <img
            src={ImageMap.get(skinID + imageName)}
            alt=""
            className="translate-middle top-50 start-50 position-absolute"
            style={{
              height: squareSize * (animate ? 0.1 : 1) + "px",
              ...transition,
              transitionDuration:
                // to preserve the normal switch hands size change speed
                (animate ? Timings.popDuration / 1000 : 0.05) + "s",
            }}
          ></img>
        )}
      </div>
    </div>
  );
}

export default HandUI;
