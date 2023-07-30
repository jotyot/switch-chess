import { SpecialBots } from "../config/Opponents";
import { Opponent } from "../classes/Opponent";

interface Props {
  selectedOpponent: number;
  setSelectedOpponent: (i: number) => void;
  setSelected: (i: Opponent) => void;
}

function AISelect({
  selectedOpponent,
  setSelectedOpponent,
  setSelected,
}: Props) {
  const size = 75;
  const small = 60;

  return (
    <div className="d-flex justify-content-center position-relative mt-3">
      {SpecialBots.map((opp, i) => (
        <div
          className="d-flex justify-content-center"
          style={{
            width: size + "px",
            height: size + "px",
          }}
        >
          <div
            className="btn rounded position-relative translate-middle-y top-50"
            style={{
              width: (i === selectedOpponent ? size : small) + "px",
              height: (i === selectedOpponent ? size : small) + "px",
              backgroundColor: "coral",
              transitionProperty: "all",
              transitionDuration: "0.05s",
            }}
            onClick={() => {
              setSelectedOpponent(i);
              setSelected(opp);
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default AISelect;
