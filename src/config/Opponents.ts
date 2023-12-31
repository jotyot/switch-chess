import { AIOpponent, Opponent } from "../classes/Opponent";
import { Classic, Neon, Royal } from "./Skins";

const None: Opponent = {
  name: "None",
  description: `No AI. Play with yourself I guess, 
  or god forbid you get someone to play in person on the same device.`,
  skin: Classic,
  message: "",
};

const Fool: AIOpponent = {
  name: "The Fool",
  description: `Switches pretty often, with little logic to it.
    Won't throw but doesn't know what its doing. Start here.`,
  skin: Classic,
  message: "that was basically the tutorial",
  traits: {
    checkmater: false,
    switchAverse: false,
    mateDefensive: false,
  },
};

const Chariot: AIOpponent = {
  name: "The Chariot",
  description: `Knows how to checkmate, but will put itself in weak positions.
    Doesn't like to switch unless it will bring a checkmate.`,
  skin: Neon,
  message: "neon",
  traits: {
    checkmater: true,
    switchAverse: true,
    mateDefensive: false,
  },
};

const Emperor: AIOpponent = {
  name: "The Emperor",
  description: `Will not put itself in checkmateable moves if it can help it.`,
  skin: Royal,
  message: "notroyal",
  traits: {
    checkmater: true,
    switchAverse: true,
    mateDefensive: true,
  },
};

const SpecialBots = [None, Fool, Chariot, Emperor];

export { SpecialBots };
