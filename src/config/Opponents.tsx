import { AIOpponent, Opponent } from "../classes/Opponent";

const Offline: Opponent = {
  name: "Offline",
  description: `No AI nor online multiplayer. Play with yourself I guess, 
  or god forbid you get someone to play in person on the same device.`,
};

const Online: Opponent = {
  name: "Online",
  description: `coming soon maybe no promises`,
};

const Fool: AIOpponent = {
  name: "The Fool",
  description: `Switches pretty often, with little logic to it.
    Won't throw but doesn't know what its doing.`,
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
  traits: {
    checkmater: true,
    switchAverse: true,
    mateDefensive: false,
  },
};

const Emperor: AIOpponent = {
  name: "The Emperor",
  description: `Will not put itself in checkmateable moves if it can help it.`,
  traits: {
    checkmater: true,
    switchAverse: true,
    mateDefensive: true,
  },
};

const SpecialBots = [Fool, Chariot, Emperor];
const Other = [Offline, Online];

export { SpecialBots, Other };
