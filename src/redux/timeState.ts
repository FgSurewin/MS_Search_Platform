import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IUseTimeState {
  queryCounting: boolean;
  updateQueryCounting: (value: boolean) => void;
  queryStartTime: string;
  updateQueryStartTime: (value: string) => void;
  currentLinkId: string;
  updateCurrentLinkId: (value: string) => void;
  linkCounting: boolean;
  updateLinkCounting: (value: boolean) => void;
  linkStartTime: string;
  updateLinkStartTime: (value: string) => void;
  chatQueryCounting: boolean;
  updateChatQueryCounting: (value: boolean) => void;
  chatQueryStartTime: string;
  updateChatQueryStartTime: (value: string) => void;
  chatQueryId: string;
  updateChatQueryId: (value: string) => void;
}

export const useTimeState = create<IUseTimeState>()(
  devtools(
    (set) => ({
      queryCounting: false,
      updateQueryCounting: (value) => {
        set(
          (state) => ({
            ...state,
            queryCounting: value,
          }),
          false,
          "updateQueryCounting"
        );
      },
      queryStartTime: "",
      updateQueryStartTime: (value) => {
        set(
          (state) => ({
            ...state,
            queryStartTime: value,
          }),
          false,
          "updateQueryStartTime"
        );
      },
      currentLinkId: "",
      updateCurrentLinkId: (value) => {
        set(
          (state) => ({
            ...state,
            currentLinkId: value,
          }),
          false,
          "updateCurrentLinkId"
        );
      },
      linkCounting: false,
      updateLinkCounting: (value) => {
        set(
          (state) => ({
            ...state,
            linkCounting: value,
          }),
          false,
          "updateLinkCounting"
        );
      },
      linkStartTime: "",
      updateLinkStartTime: (value) => {
        set(
          (state) => ({
            ...state,
            linkStartTime: value,
          }),
          false,
          "updateLinkStartTime"
        );
      },
      chatQueryCounting: false,
      updateChatQueryCounting: (value) => {
        set(
          (state) => ({
            ...state,
            chatQueryCounting: value,
          }),
          false,
          "updateChatQueryCounting"
        );
      },
      chatQueryStartTime: "",
      updateChatQueryStartTime: (value) => {
        set(
          (state) => ({
            ...state,
            chatQueryStartTime: value,
          }),
          false,
          "updateChatQueryStartTime"
        );
      },
      chatQueryId: "",
      updateChatQueryId: (value) =>
        set(
          (state) => ({
            ...state,
            chatQueryId: value,
          }),
          false,
          "updateChatQueryId"
        ),
    }),
    { name: "TimeState" }
  )
);
