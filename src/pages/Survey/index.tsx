import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenEnd from "./OpenEnd";
import { useSurveyState } from "../../redux/surveyState";

export default function SurveyPage() {
  const { surveyQuestions, updateSurveyQuestions } = useSurveyState();
  const handleContinue = () => {
    return surveyQuestions.every((question) => {
      if (question.isRequired) {
        return question.answer !== "";
      } else {
        return true;
      }
    });
  };
  const checkContinue = React.useMemo(handleContinue, [surveyQuestions]);
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Stack
        sx={{ width: "100%" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" sx={{ p: 4 }}>
          Survey
        </Typography>
        {surveyQuestions.length > 0 &&
          surveyQuestions.map((question) => {
            if (question.questionType === "MultiChoice") {
              return (
                <MultipleChoice
                  key={question.questionNumber}
                  questionNumber={question.questionNumber}
                  question={question.questionText}
                  options={question.choices}
                  answer={question.answer}
                  updateSurveyQuestions={updateSurveyQuestions}
                  isRequired={question.isRequired}
                />
              );
            } else {
              return (
                <OpenEnd
                  key={question.questionNumber}
                  questionNumber={question.questionNumber}
                  question={question.questionText}
                  answer={question.answer}
                  updateSurveyQuestions={updateSurveyQuestions}
                  isRequired={question.isRequired}
                />
              );
            }
          })}
        <Button
          variant="contained"
          disabled={!checkContinue}
          onClick={() => navigate("/feedback")}
        >
          Cotinue
        </Button>
      </Stack>
    </Container>
  );
}
