import Icon from "../classes/Icons";

const FoolIcon: Icon = {
  color: "#4CE0B3",
  imageName: "WhitePawn",
};

const ChariotIcon: Icon = {
  color: "#6D98BA",
  imageName: "nBlackKnight",
};

const EmperorIcon: Icon = {
  color: "#B8336A",
  imageName: "rBlackKing",
};

const OfflineIcon: Icon = {
  color: "red",
  imageName: "",
};

const OnlineIcon: Icon = {
  color: "green",
  imageName: "",
};

const BotIcons = [FoolIcon, ChariotIcon, EmperorIcon];
const OtherIcons = [OfflineIcon, OnlineIcon];

export { BotIcons, OtherIcons };
