import AITraits from "./AITraits";

class Opponent {
  readonly name: string = "";
  readonly description: string = "";
}
class AIOpponent extends Opponent {
  readonly traits: AITraits = new AITraits();
}

export { Opponent, AIOpponent };
