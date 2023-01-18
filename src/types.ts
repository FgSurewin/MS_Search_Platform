import {
  CreateCompletionResponse,
  CreateCompletionResponseChoicesInner,
} from "openai";



/* --------------------------- ChatGPT Interfaces --------------------------- */
export interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface ILogprobs {
  tokens: string[];
  text_offset: number[];
  token_logprobs: number[];
  top_logprobs: { [key: string]: number }[];
}

export interface IChoice extends CreateCompletionResponseChoicesInner {
  finish_reason: string;
  index: number;
  logprobs: ILogprobs;
  text: string;
}

export interface IChatBotResponse extends CreateCompletionResponse {
  choices: IChoice[];
  created: number;
  id: string;
  model: string;
  object: string;
}

export type ISearchUnit = "Bing" | "ChatGPT";
export interface IQuestion {
  questionNumber: number;
  questionText: string;
  answer: string;
  isRequired: boolean;
}

/* -------------------------- Surver Question Types ------------------------- */
export interface IMultiChoiceQuestion extends IQuestion {
  questionType: "MultiChoice";
  choices: (string | number)[];
}

export interface ITextQuestion extends IQuestion {
  questionType: "Text";
}

export type ISurveyQuestion = IMultiChoiceQuestion | ITextQuestion;

/* ------------------------ Bing Search API Response ------------------------ */
export interface IWebPageValue {
  dateLastCrawled: string;
  displayUrl: string;
  id: string;
  isFamilyFriendly: boolean;
  isNavigational: boolean;
  language: string;
  name: string;
  snippet: string;
  url: string;
  deepLinks?: {
    name?: string;
    url?: string;
  }[];
}
export interface IBingSearchResonse {
  news: any;
  queryContext: any;
  rankingResponse: any;
  relatedSearches: any;
  webPages: {
    totalEstimatedMatches: number;
    webSearchUrl: string;
    value: IWebPageValue[];
  };
}
// export interface IBingSearchResonse {
//   config: any;
//   headers: any;
//   request: any;
//   status: number;
//   statusText: string;
//   data: {
//     news: any;
//     queryContext: any;
//     rankingResponse: any;
//     relatedSearches: any;
//     webPages: {
//       totalEstimatedMatches: number;
//       webSearchUrl: string;
//       value: IWebPageValue[];
//     };
//   };
// }

/* -------------------------- Product Information --------------------------- */
export interface IProduct {
  make: string;
  model: string;
  trim: string;
  cargo_space: number;
  length: number;
}

// export type IProductDimension = keyof IProduct;
export type IProductDimension = "cargo_space" | "length";

/* --------------------------- Session State Types -------------------------- */
export interface IProductMatrixInput {
    value: number;
    lastQueryId: string | null;
    inputTime: string;
}

export interface IProductMatrix {
  make: string;
  model: string;
  trim: string;
  cargo_space: IProductMatrixInput;
  length: IProductMatrixInput;
}

export interface IClickedLink {
  linkId: string;
  url: string;
  clickedTime: string[];
  title: string;
  snippet: string;
  duration:number[]
}
export interface IBingQuery {
  queryId: string;
  query: string;
  queryTime: string[];
  clickedLinks: IClickedLink[];
  cachedLinks: IWebPageValue[] | undefined;
}

export interface IChatGPTQuery {
  queryId: string;
  query: string;
  queryTime: string[];
  answer: IChoice;
  usage: IUsage;
  duration: number[];
}