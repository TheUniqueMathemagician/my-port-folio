import generateID from "../../functions/generateID";

export default class User {
  public readonly id: string = generateID();

  //TODO: Add Theme, language, general preferences
  constructor(public readonly name: string, public readonly password: string) {}
}
