import create from "zustand";
import { devtools } from "zustand/middleware";
import { IProduct, ISearchUnit } from "../types";
import { Randomizer } from "../utils/randomizer";

export interface IUseSessionState {
  searchUnit: ISearchUnit;
  selectedDimensions: string[];
  selectedProducts: {
    model: string;
    [key: string]: number | string;
  }[];
  // selectedProducts: {
  //   // name: string;
  //   [key: string]: number | string;
  // }[];
  userInputs: {
    model: string;
    cargo_space: number;
    length: number;
    [key: string]: number | string;
  }[];
  updateUserInputs: (
    productName: string,
    dimension: string,
    newValue: string
  ) => void;
  finalDecision: string;
  updateFinalDecision: (value: string) => void;
}

export const useSessionState = create<IUseSessionState>()(
  devtools(
    (set) => {
      const productSamples = Randomizer.sampkingProducts(2);
      const cleanedProductSamples = cleanProductInfo(productSamples);
      return {
        searchUnit: Randomizer.randomSearchUnitAssignment(),
        // searchUnit: "Bing",
        selectedDimensions: ["cargo_space", "length"],
        selectedProducts: productSamples,
        userInputs: cleanedProductSamples,
        updateUserInputs: (productName, dimension, newValue) => {
          set(
            (state) => ({
              ...state,
              userInputs: state.userInputs.map((product) => ({
                ...product,
                [dimension]:
                  product.model === productName ? newValue : product[dimension],
              })),
            }),
            false,
            "updateUserInputs"
          );
        },
        finalDecision: "",
        updateFinalDecision: (value) => {
          set(
            (state) => ({
              ...state,
              finalDecision: value,
            }),
            false,
            "updateFinalDecision"
          );
        },
      };
    },
    { name: "SessionState" }
  )
);

function cleanProductInfo(products: IProduct[]) {
  return products.map((product) => ({
    model: product.model,
    make: product.make,
    trim: product.trim,
    cargo_space: 0,
    length: 0,
  }));
}