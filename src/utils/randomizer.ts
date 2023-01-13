import { ISearchUnit } from "../types";
import data from "../assets/table.json";
import _ from "lodash";

export class Randomizer {
  public static randomSearchUnitAssignment(): ISearchUnit {
    const random = Math.random();
    return random < 0.5 ? "Bing" : "ChatGPT";
  }

  public static sampkingProducts(num: number) {
    const products = data;
    const sampleProducts = _.sampleSize(products, num);
    return sampleProducts;
  }
}
