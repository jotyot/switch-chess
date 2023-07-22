class AITraits {
  checkmater = false;
  switchAverse = true;
  constructor(traits: string[]) {
    this.checkmater = traits.includes("checkmater");
    this.switchAverse = traits.includes("switchAverse");
  }
}
export default AITraits;
