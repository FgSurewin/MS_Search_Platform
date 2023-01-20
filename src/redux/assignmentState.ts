import create from "zustand";
import { devtools } from "zustand/middleware";
import { IProduct } from "../types";
import { Randomizer } from "../utils/randomizer";

export interface IUseAssignmentState {
  product_pairs: IProduct[][];
  curr_task_idx: number;
  search_unit: "Bing" | "ChatGPT";
  hasFeedback: boolean;
  updataTaskIdx: (idx: number) => void;
}

export const useAssignmentState = create<IUseAssignmentState>()(
  devtools(
    (set) => ({
      product_pairs: Randomizer.ramdomProductPairs(5),
      curr_task_idx: 0,
      search_unit: Randomizer.randomSearchUnitAssignment(),
      hasFeedback: Randomizer.randomBinary(),
      updataTaskIdx(idx) {
        set(
          (state) => ({
            ...state,
            curr_task_idx: idx,
          }),
          false,
          "updataTaskIdx"
        );
      },
    }),
    { name: "AssignmentState" }
  )
);
