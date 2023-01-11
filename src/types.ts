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
