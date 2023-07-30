import { Opponent } from "../classes/Opponent";
import Colors from "../config/Colors";
import { Other, SpecialBots } from "../config/Opponents";
import { useState } from "react";
import OpponentSelect from "./OpponentSelect";
import AISelect from "./AISelect";

interface Props {
  width?: number;
  onClick: () => void;
  opponent: Opponent;
  setOpponent: (o: Opponent) => void;
}

function OpponentCard({ width = 360, onClick, opponent, setOpponent }: Props) {
  const closeHeight = 40;
  const openHeight = 300;

  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedOpponent, setSelectedOpponent] = useState(0);
  const [open, setOpen] = useState(false);

  const groups = ["Bots", "Other"];

  return (
    <div
      className="container position-relative mt-2 rounded"
      style={{
        width: width + "px",
        height: (open ? openHeight : closeHeight) + "px",
        backgroundColor: Colors.secondary,
        transitionProperty: "height, padding-top",
        transitionDuration: "0.5s",
        paddingTop: closeHeight / 2 - 14 + "px",
      }}
    >
      <div
        className="text-center position-relative"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
        onClick={() => {
          setOpen(!open);
          setTimeout(onClick, 200);
        }}
      >
        {opponent.name}
      </div>

      {open && (
        <div>
          <OpponentSelect
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
          {groups[selectedGroup] === "Bots" && (
            <AISelect
              setSelected={setOpponent}
              selectedOpponent={selectedOpponent}
              setSelectedOpponent={setSelectedOpponent}
            />
          )}
          {groups[selectedGroup] === "Other" && "other"}
          <div className="text-center mt-2 mx-4" style={{ fontSize: "15px" }}>
            {opponent.description}
          </div>
        </div>
      )}
    </div>
  );
}

export default OpponentCard;
