import { IProduct, ISearchUnit } from "../types";
import data from "../assets/new_table.json";
import _ from "lodash";

export class Randomizer {
  public static randomSearchUnitAssignment(): ISearchUnit {
    const random = Math.random();
    return random < 0.5 ? "Bing" : "ChatGPT";
  }

  public static randomBinary(): boolean {
    const random = Math.random();
    return random < 0.5 ? true : false;
  }

  public static sampkingProducts(num: number) {
    const products = data;
    const sampleProducts = _.sampleSize(products, num);
    return sampleProducts;
  }

  public static ramdomProductPairs(length: number, num = 2) {
    let products = data;
    const result: IProduct[][] = [];
    for (let idx = 0; idx < length; idx++) {
      const productPair = _.sampleSize(products, num);
      result.push(productPair);
      products = products.filter((product) => !productPair.includes(product));
    }
    return result;
  }
}
