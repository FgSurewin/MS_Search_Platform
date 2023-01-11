import React from "react";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export interface IMultipleChoiceProps {
  questionNumber: number;
  question: string;
  options: string[];
}

export default function MultipleChoice({
  question,
  questionNumber,
  options,
}: IMultipleChoiceProps) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Box sx={{ mb: 2, width: "100%" }}>
      <Typography variant="h6" component="p">
        <Typography variant="h6" component="span">
          {`${questionNumber}. `}
        </Typography>
        <Typography variant="h6" component="span">
          {question}
        </Typography>
        <Typography variant="h6" component="span">
          ?
        </Typography>
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
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
    </Box>
  );
}
