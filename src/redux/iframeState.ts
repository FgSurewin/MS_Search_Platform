import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IIFrameState {
  show: boolean;
  setShow: (show: boolean) => void;
  url: string;
  setUrl: (url: string) => void;
}

export const useIframeState = create<IIFrameState>()(
  devtools(
    (set) => ({
      show: false,
      setShow: (show) => {
        set(
          (state) => ({
            ...state,
            show,
          }),
          false,
          "setShow"
        );
      },
      url: "",
      setUrl: (url) => {
        set(
          (state) => ({
            ...state,
            url,
          }),
          false,
          "setUrl"
        );
      },
    }),
    { name: "IFrameState" }
  )
);
