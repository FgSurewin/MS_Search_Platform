import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IUseSessionState {
  selectedDimensions: string[];
  selectedProducts: {
    name: string;
    [key: string]: number | string;
  }[];
  updateSelectedProducts: (
    productName: string,
    dimension: string,
    newValue: string
  ) => void;
  finalDecision?: string;
  updateFinalDecision: (value: string) => void;
}

export const useSessionState = create<IUseSessionState>()(
  devtools(
    (set) => ({
      selectedDimensions: ["dimension_1", "dimension_2", "dimension_3"],
      selectedProducts: [
        {
          name: "Product 1",
          dimension_1: "one",
          dimension_2: 2,
          dimension_3: 3,
        },
        {
          name: "Product 2",
          dimension_1: "two",
          dimension_2: 4,
          dimension_3: 5,
        },
        {
          name: "Product 3",
          dimension_1: "three",
          dimension_2: 6,
          dimension_3: 7,
        },
      ],
      updateSelectedProducts: (productName, dimension, newValue) => {
        set(
          (state) => ({
            ...state,
            selectedProducts: state.selectedProducts.map((product) => ({
              ...product,
              [dimension]:
                product.name === productName ? newValue : product[dimension],
            })),
          }),
          false,
          "updateSelectedProducts"
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
    }),
    { name: "SessionState" }
  )
);
