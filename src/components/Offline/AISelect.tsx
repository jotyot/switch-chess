import AITraits from "../../classes/AITraits";
import BotButton from "./BotButton";
import BotInfo from "./BotInfo";
import PlayButton from "./PlayButton";
import Colors from "../../config/Colors";

interface Props {
  botList: AITraits[];
  hovered: number;
  selected: number;
  setSelected: (i: number) => void;
  setHovered: (i: number) => void;
  setPlay: (t: boolean) => void;
}

function AISelect({
  botList,
  hovered,
  selected,
  setSelected,
  setHovered,
  setPlay,
}: Props) {
  return (
    <div className="container position-relative">
      <div
        className="d-flex justify-content-center position-relative start-50 translate-middle-x mt-5"
        style={{ width: "400px" }}
      >
        {botList.map((_trait, index) => {
          return (
            <BotButton
              color={index === selected ? Colors.primary : Colors.secondary}
              label={index}
              onClick={() => setSelected(index)}
              onMouseOver={() => setHovered(index)}
              onMouseOut={() => setHovered(-1)}
            />
          );
        })}
      </div>
      <BotInfo botList={botList} selected={selected} hovered={hovered} />
      {selected !== -1 && <PlayButton onClick={() => setPlay(true)} />}
    </div>
  );
}

export default AISelect;
