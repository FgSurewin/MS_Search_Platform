import React from "react";
import { Card, Typography, TextField } from "@mui/material";

export interface IOpenEndProps {
  questionNumber: number;
  question: string;
  answer: string;
  updateSurveyQuestions: (questionNumber: number, answer: string) => void;
  isRequired: boolean;
}

export default function OpenEnd({
  question,
  questionNumber,
  answer,
  updateSurveyQuestions,
  isRequired,
}: IOpenEndProps) {
  const [value, setValue] = React.useState(answer);
  const [error, setError] = React.useState(false);
  const handleBlur = () => {
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
    updateSurveyQuestions(questionNumber, value);
  };

  return (
    <Card
      sx={{
        mb: 4,
        p: 6,
        width: "100%",
        borderRadius: 6,
        boxShadow: 4,
        border: error ? "1px solid red" : "none",
      }}
    >
      <Typography variant="h6" component="p">
        <Typography variant="h6" component="span">
          {`${questionNumber}. `}
        </Typography>
        <Typography variant="h6" component="span">
          {question}
        </Typography>
        {isRequired && (
          <Typography
            variant="h6"
            component="span"
            color="error"
            sx={{ ml: 2 }}
          >
            *
          </Typography>
        )}
      </Typography>
      <TextField
        id={`open_end_answer_${questionNumber}`}
        // label="Answer"
        multiline
        rows={4}
        placeholder="Enter your answer here..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        sx={{ mt: 2, width: "100%" }}
      />
      {error && (
        <Typography sx={{ mt: 2 }} color="error">
          This field is required.
        </Typography>
      )}
    </Card>
  );
}
