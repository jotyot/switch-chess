import { Classic } from "../config/Skins";
import AITraits from "./AITraits";
import Skin from "./Skin";

class Opponent {
  readonly name: string = "";
  readonly description: string = "";
  readonly skin: Skin = Classic;
}
class AIOpponent extends Opponent {
  readonly traits: AITraits = new AITraits();
}

export { Opponent, AIOpponent };
