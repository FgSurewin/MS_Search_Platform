import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IUseFeedbackState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useFeedbackState = create<IUseFeedbackState>()(
  devtools(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => {
        set(
          (state) => ({
            ...state,
            isOpen,
          }),
          false,
          "setIsOpen"
        );
      },
    }),
    { name: "FeedbackState" }
  )
);
