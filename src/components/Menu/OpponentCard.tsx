import { Opponent } from "../../classes/Opponent";
import Colors from "../../config/Colors";
import { useState } from "react";
import GroupSelect from "./GroupSelect";
import ItemCards from "./ItemCards";
import { Other, SpecialBots } from "../../config/Opponents";
import Skin from "../../classes/Skin";
import Skins from "../../config/Skins";
import ItemButtons from "./ItemButtons";
import PieceDisplay from "./PieceDisplay";
import PointsInfo from "./PointsInfo";
import GameTips from "./GameTips";

interface Props {
  width?: number;
  onClick: () => void;
  opponent: Opponent;
  setOpponent: (o: Opponent) => void;
  skin: Skin;
  setSkin: (s: Skin) => void;
  piece: string;
  setPiece: (s: string) => void;
}

function OpponentCard({
  width = 360,
  onClick,
  opponent,
  setOpponent,
  skin,
  setSkin,
  piece,
  setPiece,
}: Props) {
  const closeHeight = 40;
  const openHeight = 650;

  const [open, setOpen] = useState(true);
  function toggleGame() {
    setOpen(!open);
    open ? setTimeout(onClick, 300) : setTimeout(onClick, 50);
  }

  const groups = ["Bots", "Other"];
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedOpponent, setSelectedOpponent] = useState(0);

  const [selectedSkin, setSelectedSkin] = useState(0);

  return (
    <div
      className="container position-relative mt-2 rounded"
      style={{
        width: width + "px",
        height: (open ? openHeight : closeHeight) + "px",
        backgroundColor: Colors.secondary,
        transitionProperty: "height, padding-top",
        transitionDuration: ".5s",
        paddingTop: closeHeight / 2 - 14 + "px",
      }}
    >
      <div
        className="text-center position-relative hover"
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
            <ItemCards<Opponent>
              list={SpecialBots}
              setSelected={setOpponent}
              selectedItem={selectedOpponent}
              setSelectedItem={setSelectedOpponent}
              toggleGame={toggleGame}
            />
          )}
          {groups[selectedGroup] === "Other" && (
            <ItemCards<Opponent>
              list={Other}
              setSelected={setOpponent}
              selectedItem={selectedOpponent}
              setSelectedItem={setSelectedOpponent}
              toggleGame={toggleGame}
              offset={SpecialBots.length}
            />
          )}
          <div
            className="text-center mt-2 mx-4"
            style={{ fontSize: "15px", height: "60px" }}
          >
            {opponent.description}
          </div>
          <div
            className="text-center position-relative mt-5"
            style={{ fontSize: "20px" }}
          >
            {"Skins"}
          </div>
          <ItemButtons
            groups={Skins}
            selectedItem={selectedSkin}
            setSelectedItem={setSelectedSkin}
            setSelected={setSkin}
          />
          <PieceDisplay skinID={skin.id} piece={piece} setPiece={setPiece} />
          <PointsInfo piece={piece} />
          <GameTips />
        </div>
      )}
    </div>
  );
}

export default OpponentCard;
