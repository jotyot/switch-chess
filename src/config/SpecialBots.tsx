import AITraits from "../classes/AITraits";

const Fool: AITraits = {
  name: "The Fool",
  description: `Switches pretty often, with little logic to it.
    Won't throw but doesn't know what its doing.`,
  checkmater: false,
  switchAverse: false,
  mateDefensive: false,
};

const Chariot: AITraits = {
  name: "The Chariot",
  description: `Knows how to checkmate, but will put itself in weak positions.
    Doesn't like to switch unless it will bring a checkmate.`,
  checkmater: true,
  switchAverse: true,
  mateDefensive: false,
};

const Emperor: AITraits = {
  name: "The Emperor",
  description: `Will not put itself in checkmateable moves if it can help it.`,
  checkmater: true,
  switchAverse: true,
  mateDefensive: true,
};

const SpecialBots = [Fool, Chariot, Emperor];

export default SpecialBots;
