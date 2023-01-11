import create from "zustand";
import { devtools } from "zustand/middleware";
import { ISurveyQuestion } from "../types";

export interface IUseSurveyState {
  surveyQuestions: ISurveyQuestion[];
  updateSurveyQuestions: (questionNumber: number, answer: string) => void;
}

// const sampleQuestions: ISurveyQuestion[] = [
//   {
//     questionNumber: 1,
//     questionText: "What is your name?",
//     questionType: "Text",
//     answer: "",
//   },
//   {
//     questionNumber: 2,
//     questionText: "What is your gender?",
//     questionType: "MultiChoice",
//     choices: ["male", "female"],
//     answer: "",
//   },
// ];

export const useSurveyState = create<IUseSurveyState>()(
  devtools(
    (set) => ({
      surveyQuestions: [],
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
