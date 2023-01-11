import { ISearchUnit } from "../types";

export class Randomizer {
  public static randomSearchUnitAssignment(): ISearchUnit {
    const random = Math.random();
    return random < 0.5 ? "Bing" : "ChatGPT";
  }
}
