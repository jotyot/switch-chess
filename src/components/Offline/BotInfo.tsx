import AITraits from "../../classes/AITraits";

interface Props {
  botList: AITraits[];
  hovered: number;
  selected: number;
}

function BotInfo({ botList, hovered, selected }: Props) {
  const maxWidth = 350;
  const maxHeight = 150;
  const nameFontSize = 40;
  const descFontSize = 20;

  return (
    <>
      <div
        className="text-center position-relative mt-5"
        style={{ fontSize: nameFontSize + "px", fontWeight: "bold" }}
      >
        {hovered !== -1
          ? botList[hovered].name
          : selected !== -1 && botList[selected].name}
      </div>
      <div
        className="text-center position-relative 
        start-50 translate-middle-x"
        style={{
          fontSize: descFontSize + "px",
          width: maxWidth + "px",
          height: maxHeight + "px",
        }}
      >
        {hovered !== -1
          ? botList[hovered].description
          : selected !== -1 && botList[selected].description}
      </div>
    </>
  );
}

export default BotInfo;
