import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IUseThemeState {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

export const useThemeState = create<IUseThemeState>()(
  devtools(
    (set) => ({
      mode: "light",
      setMode: (mode) => {
        set(
          (state) => ({
            ...state,
            mode,
          }),
          false,
          "setMode"
        );
      },
    }),
    { name: "ThemeState" }
  )
);
