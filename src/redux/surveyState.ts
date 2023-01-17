import create from "zustand";
import { devtools } from "zustand/middleware";
import { ISurveyQuestion } from "../types";

export interface IUseSurveyState {
  surveyQuestions: ISurveyQuestion[];
  updateSurveyQuestions: (questionNumber: number, answer: string) => void;
}

const sampleQuestions: ISurveyQuestion[] = [
  {
    questionNumber: 1,
    questionText: "What is your name?",
    questionType: "Text",
    answer: "",
    isRequired: true,
  },
  {
    questionNumber: 2,
    questionText: "What is your gender?",
    questionType: "MultiChoice",
    choices: ["male", "female"],
    answer: "",
    isRequired: true,
  },
  {
    questionNumber: 3,
    questionText: "What is your age?",
    questionType: "MultiChoice",
    choices: [30, 40, 50, 60, 70, 80, 90, 100],
    answer: "",
    isRequired: false,
  },
  {
    questionNumber: 4,
    questionText: "What is your position",
    questionType: "Text",
    answer: "",
    isRequired: false,
  },
];

export const useSurveyState = create<IUseSurveyState>()(
  devtools(
    (set) => ({
      surveyQuestions: sampleQuestions,
      updateSurveyQuestions: (questionNumber, answer) => {
        set(
          (state) => ({
            ...state,
            surveyQuestions: state.surveyQuestions.map((question) => {
              if (question.questionNumber === questionNumber) {
                return { ...question, answer };
              }
              return question;
            }),
          }),
          false,
          "setMode"
        );
      },
    }),
    { name: "SurveyState" }
  )
);
