import {
  CreateCompletionResponse,
  CreateCompletionResponseChoicesInner,
} from "openai";

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
}

export interface IMultiChoiceQuestion extends IQuestion {
  questionType: "MultiChoice";
  choices: string[];
}

export interface ITextQuestion extends IQuestion {
  questionTYpe: "Text";
}

export type ISurveyQuestion = IMultiChoiceQuestion | ITextQuestion;
