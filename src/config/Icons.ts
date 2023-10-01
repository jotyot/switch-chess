import Icon from "../classes/Icons";
import Colors from "./Colors";

const FoolIcon: Icon = {
  color: Colors.gold,
  imageName: "WhitePawn",
};

const ChariotIcon: Icon = {
  color: Colors.cyan,
  imageName: "nBlackKnight",
};

const EmperorIcon: Icon = {
  color: "#d82375",
  imageName: "rBlackKing",
};

const OfflineIcon: Icon = {
  color: "#f9b2dd",
  imageName: "",
};

const BotIcons = [OfflineIcon, FoolIcon, ChariotIcon, EmperorIcon];

export { BotIcons };
