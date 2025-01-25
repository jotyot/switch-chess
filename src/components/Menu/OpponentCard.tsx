import { Opponent } from "../../classes/Opponent";
import Colors from "../../config/Colors";
import { useState } from "react";
import ItemIcons from "./ItemIcons";
import { SpecialBots } from "../../config/Opponents";
import Skin from "../../classes/Skin";
import { Skins } from "../../config/Skins";
import ItemButtons from "./ItemButtons";
import PieceDisplay from "./PieceDisplay";
import PointsInfo from "./PointsInfo";
import GameTips from "./GameTips";
import { BotIcons } from "../../config/Icons";
import Logo from "./Logo";

interface Props {
  width?: number;
  resetGame: () => void;
  currentOpponent: string;
  opponent: Opponent;
  setOpponent: (o: Opponent) => void;
  skin: Skin;
  setSkin: (s: Skin) => void;
  piece: string;
  setPiece: (s: string) => void;
}

function OpponentCard({
  width = 360,
  resetGame,
  currentOpponent,
  opponent,
  setOpponent,
  skin,
  setSkin,
  piece,
  setPiece,
}: Props) {
  const closeHeight = 40;
  const openHeight = 663;

  const [open, setOpen] = useState(false);
  function toggleGame() {
    if (open && currentOpponent !== opponent.name) resetGame();
    setOpen(!open);
  }

  const [selectedOpponent, setSelectedOpponent] = useState(1);

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
        transitionTimingFunction: "ease-in-out",
        paddingTop: "2px",
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: "3px",
        borderColor: Colors.dark,
      }}
    >
      <div
        className="d-flex hover justify-content-center"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={toggleGame}
      >
        {opponent.name}
      </div>

      <div>
        <ItemIcons<Opponent>
          list={SpecialBots}
          setSelected={setOpponent}
          selectedItem={selectedOpponent}
          setSelectedItem={setSelectedOpponent}
          toggleGame={toggleGame}
          icons={BotIcons}
        />

        <div
          className="text-center mt-4 mx-4"
          style={{ fontSize: "15px", height: "120px" }}
        >
          {opponent.description}
        </div>
        <Logo />
        <div style={{ marginTop: 60 + "px" }}>
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
      </div>
    </div>
  );
}

export default OpponentCard;
