import React from "react";
import {
  Card,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export interface IMultipleChoiceProps {
  questionNumber: number;
  question: string;
  options: (string | number)[];
  answer: string;
  updateSurveyQuestions: (questionNumber: number, answer: string) => void;
  isRequired: boolean;
}

export default function MultipleChoice({
  question,
  questionNumber,
  options,
  answer,
  updateSurveyQuestions,
  isRequired,
}: IMultipleChoiceProps) {
  const [error, setError] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSurveyQuestions(
      questionNumber,
      (event.target as HTMLInputElement).value
    );
  };

  const handleBlur = () => {
    if (answer === "") {
      setError(true);
    } else {
      setError(false);
    }
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
      <FormControl>
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={answer}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error && (
        <Typography sx={{ mt: 2 }} color="error">
          This field is required.
        </Typography>
      )}
    </Card>
  );
}
