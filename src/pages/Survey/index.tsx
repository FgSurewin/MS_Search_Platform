import React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenEnd from "./OpenEnd";

export default function SurveyPage() {
  const [checked, setChecked] = React.useState(false);
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
        <MultipleChoice
          questionNumber={1}
          question={"Fake survey question one"}
          options={["Option 1", "Option 2", "Option 3", "Option 4"]}
        />
        <OpenEnd questionNumber={2} question={"Fake suyvey question two"} />
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label="Click here to confirm all your answer are accurate."
          sx={{ pb: 2 }}
          onClick={() => setChecked(!checked)}
        />
        <Button
          variant="contained"
          disabled={!checked}
          onClick={() => navigate("/feedback")}
        >
          Cotinue
        </Button>
      </Stack>
    </Container>
  );
}
