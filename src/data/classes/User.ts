import generateID from "../../functions/generateID";

export default class User {
  public readonly id: string = generateID();

  /**
   *
   */
  constructor(public readonly name: string, public readonly password: string) {}
}
