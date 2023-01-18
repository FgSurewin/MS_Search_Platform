import create from "zustand";
import moment from "moment";
import { devtools } from "zustand/middleware";
import {
  IProduct,
  ISearchUnit,
  IProductMatrix,
  IProductDimension,
  IChatGPTQuery,
  IBingQuery,
  IClickedLink,
  IProductMatrixInput,
} from "../types";
import { Randomizer } from "../utils/randomizer";

export interface IUseSessionState {
  workerId: string;
  updateWorkerId: (value: string) => void;
  scenarioId: string;
  searchUnit: ISearchUnit;
  startTimestamp: string;
  updateStartTimestamp: (value: string) => void;
  endTimestamp: string;
  updateEndTimestamp: (value: string) => void;
  selectedDimensions: IProductDimension[];
  groundTruth: IProduct[];
  productMatrix: IProductMatrix[];
  updateProductMatrix: (
    model: string,
    dimension: IProductDimension,
    update: Partial<IProductMatrixInput>
  ) => void;
  finalDecision: string;
  updateFinalDecision: (value: string) => void;
  currentQueryIndex: number | null;
  updateCurrentQueryIndex: (value: number) => void;
  bingQueries: IBingQuery[];
  addBingQuery: (newQuery: IBingQuery) => void;
  updateBingQuery: (queryId: string, update: Partial<IBingQuery>) => void;
  addClickedLink: (queryId: string, newLink: IClickedLink) => void;
  updateBingQueryLink: (
    queryId: string,
    linkId: string,
    update: Partial<IClickedLink>
  ) => void;
  chatgptQueries: IChatGPTQuery[];
  addChatgptQuery: (newQuery: IChatGPTQuery) => void;
  updateChatgptQueries: (
    queryId: string,
    upate: Partial<IChatGPTQuery>
  ) => void;
}

export const useSessionState = create<IUseSessionState>()(
  devtools(
    (set) => {
      const productSamples = Randomizer.sampkingProducts(2);
      const cleanedProductSamples = cleanProductInfo(productSamples);
      return {
        workerId: "worker",
        updateWorkerId: (value) => {
          set(
            (state) => ({
              ...state,
              workerId: value,
            }),
            false,
            "updateWorkerId"
          );
        },
        scenarioId: "scenario",
        startTimestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        updateStartTimestamp: (value) => {
          set(
            (state) => ({
              ...state,
              startTimestamp: value,
            }),
            false,
            "updateStartTimestamp"
          );
        },
        endTimestamp: "",
        updateEndTimestamp: (value) => {
          set(
            (state) => ({
              ...state,
              endTimestamp: value,
            }),
            false,
            "updateEndTimestamp"
          );
        },
        searchUnit: Randomizer.randomSearchUnitAssignment(),
        // searchUnit: "ChatGPT",
        selectedDimensions: ["cargo_space", "length"],
        groundTruth: productSamples,
        productMatrix: cleanedProductSamples,
        updateProductMatrix: (model, dimension, update) => {
          set(
            (state) => {
              const newProductMatrix = state.productMatrix.map((product) => {
                if (product.model === model) {
                  return {
                    ...product,
                    [dimension]: {
                      ...product[dimension],
                      ...update,
                    },
                  };
                }
                return product;
              });
              return {
                ...state,
                productMatrix: newProductMatrix,
              };
            },
            false,
            "updateProductMatrix"
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
        currentQueryIndex: null,
        updateCurrentQueryIndex: (value) => {
          set(
            (state) => ({
              ...state,
              currentQueryIndex: value,
            }),
            false,
            "updateCurrentQueryIndex"
          );
        },
        bingQueries: [],
        addBingQuery: (newQuery) => {
          set(
            (state) => ({
              ...state,
              bingQueries: [...state.bingQueries, newQuery],
            }),
            false,
            "addBingQuery"
          );
        },
        updateBingQuery: (queryId, update) => {
          set(
            (state) => ({
              ...state,
              bingQueries: state.bingQueries.map((query) => {
                if (query.queryId === queryId) {
                  return {
                    ...query,
                    ...update,
                  };
                }
                return query;
              }),
            }),
            false,
            "updateBingQuery"
          );
        },
        addClickedLink: (queryId, newLink) => {
          set(
            (state) => ({
              ...state,
              bingQueries: state.bingQueries.map((query) => {
                if (query.queryId === queryId) {
                  return {
                    ...query,
                    clickedLinks: [...query.clickedLinks, newLink],
                  };
                }
                return query;
              }),
            }),
            false,
            "addClickedLink"
          );
        },
        updateBingQueryLink: (queryId, linkId, update) => {
          set(
            (state) => ({
              ...state,
              bingQueries: state.bingQueries.map((query) => {
                if (query.queryId === queryId) {
                  return {
                    ...query,
                    clickedLinks: query.clickedLinks.map((link) => {
                      if (link.linkId === linkId) {
                        return {
                          ...link,
                          ...update,
                        };
                      }
                      return link;
                    }),
                  };
                }
                return query;
              }),
            }),
            false,
            "updateBingQueryLink"
          );
        },
        chatgptQueries: [],
        addChatgptQuery: (newQuery) => {
          set(
            (state) => ({
              ...state,
              chatgptQueries: [...state.chatgptQueries, newQuery],
            }),
            false,
            "addChatgptQuery"
          );
        },
        updateChatgptQueries: (queryId, update) => {
          set(
            (state) => ({
              ...state,
              chatgptQueries: state.chatgptQueries.map((query) => {
                if (query.queryId === queryId) {
                  return {
                    ...query,
                    ...update,
                  };
                }
                return query;
              }),
            }),
            false,
            "updateChatgptQueries"
          );
        },
      };
    },
    { name: "SessionState" }
  )
);

function cleanProductInfo(products: IProduct[]): IProductMatrix[] {
  return products.map((product) => ({
    model: product.model,
    make: product.make,
    trim: product.trim,
    cargo_space: {
      value: 0,
      lastQueryId: null,
      inputTime: "",
    },
    length: {
      value: 0,
      lastQueryId: null,
      inputTime: "",
    },
  }));
}