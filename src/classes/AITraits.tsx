class AITraits {
  readonly checkmater;
  readonly switchAverse;
  readonly name;
  readonly description;
  /**
   * @param traits checkmater switchAverse
   */
  constructor(traits: string[], name = "The Void", description = "...") {
    this.checkmater = traits.includes("checkmater");
    this.switchAverse = traits.includes("switchAverse");
    this.name = name;
    this.description = description;
  }
}
export default AITraits;