import { Opponent } from "../classes/Opponent";
import Colors from "../config/Colors";
import { useState } from "react";
import GroupSelect from "./GroupSelect";
import OpponentSelect from "./OpponentSelect";
import { Other, SpecialBots } from "../config/Opponents";

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
  function toggleGame() {
    setOpen(!open);
    setTimeout(onClick, 200);
  }

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
        onClick={toggleGame}
      >
        {opponent.name}
      </div>

      {open && (
        <div>
          <GroupSelect
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
          {groups[selectedGroup] === "Bots" && (
            <OpponentSelect
              opponents={SpecialBots}
              setSelected={setOpponent}
              selectedOpponent={selectedOpponent}
              setSelectedOpponent={setSelectedOpponent}
              toggleGame={toggleGame}
            />
          )}
          {groups[selectedGroup] === "Other" && (
            <OpponentSelect
              opponents={Other}
              setSelected={setOpponent}
              selectedOpponent={selectedOpponent}
              setSelectedOpponent={setSelectedOpponent}
              toggleGame={toggleGame}
              offset={SpecialBots.length}
            />
          )}
          <div className="text-center mt-2 mx-4" style={{ fontSize: "15px" }}>
            {opponent.description}
          </div>
        </div>
      )}
    </div>
  );
}

export default OpponentCard;
