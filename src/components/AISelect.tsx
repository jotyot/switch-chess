import { SpecialBots } from "../config/Opponents";
import { Opponent } from "../classes/Opponent";

interface Props {
  opponents: Opponent[];
  offset?: number;
  selectedOpponent: number;
  setSelectedOpponent: (i: number) => void;
  setSelected: (i: Opponent) => void;
  toggleGame: () => void;
}

function AISelect({
  opponents,
  offset = 0,
  selectedOpponent,
  setSelectedOpponent,
  setSelected,
  toggleGame,
}: Props) {
  const size = 75;
  const small = 60;
  const colors = ["red", "green", "blue"];

  return (
    <div className="d-flex justify-content-center position-relative mt-3">
      {opponents.map((opp, i) => (
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
              width: (i + offset === selectedOpponent ? size : small) + "px",
              height: (i + offset === selectedOpponent ? size : small) + "px",
              backgroundColor: colors[i],
              transitionProperty: "all",
              transitionDuration: "0.05s",
            }}
            onClick={() => {
              setSelectedOpponent(i + offset);
              setSelected(opp);
              if (i + offset === selectedOpponent) toggleGame();
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default AISelect;
