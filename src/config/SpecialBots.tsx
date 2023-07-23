import AITraits from "../classes/AITraits";

const Fool: AITraits = {
  name: "The Fool",
  description: `offline multiplayer`,
  checkmater: false,
  switchAverse: false,
};

const Chariot: AITraits = {
  name: "The Chariot",
  description: `Switches pretty often, with little logic to it.
    Won't throw but doesn't know what its doing.`,
  checkmater: false,
  switchAverse: false,
};

const Hermit: AITraits = {
  name: "The Hermit",
  description: `Knows how to checkmate, but will put itself in weak positions.
    Doesn't like to switch unless it will bring a checkmate.`,
  checkmater: true,
  switchAverse: true,
};

const SpecialBots = [Fool, Chariot, Hermit];

export default SpecialBots;
