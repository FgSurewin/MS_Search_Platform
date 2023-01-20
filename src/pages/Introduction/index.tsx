import React from "react";
import {
  Container,
  Typography,
  Stack,
  FormControlLabel,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import { RegularText } from "../Consent";

export default function IntroductionPage({
  setCheckIntroduction,
}: {
  setCheckIntroduction: (value: boolean) => void;
}) {
  const [checked, setChecked] = React.useState(false);
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ px: 4, py: 2, textAlign: "center" }}>
        Introduction
      </Typography>
      <RegularText
        sx={{ mb: 2 }}
        text="In this HIT you will complete a sequence of 5 tasks, where each task involves choosing one of two sports utility vehicles (SUVs) that is better according to some criteria, described below. "
      />
      <RegularText sx={{ mb: 2 }}>
        In each task you will be shown the make, model, and trim of two SUVs and
        asked to research their details, specifically the{" "}
        <b>total cargo space</b> and <b>total length</b> of each vehicle.
      </RegularText>
      <RegularText sx={{ mb: 2 }}>
        Your goal is to choose the SUV that has the{" "}
        <b>largest amount of total cargo space for its length.</b> In other
        words, you want to compare the ratio of{" "}
        <b>total cargo space / total length</b> and{" "}
        <b>choose the SUV with the larger ratio.</b>
      </RegularText>
      <RegularText sx={{ mb: 2 }}>
        By <b>total cargo space</b> we mean the maximum amount of space behind
        the driver’s seat (i.e., with all other rows folded down). This is
        typically measured in cubic feet.
      </RegularText>
      <RegularText sx={{ mb: 2 }}>
        By <b>total length</b> we mean the exterior length of the SUV from the
        front to back of the car. This is typically measured in feet.
      </RegularText>
      <RegularText sx={{ mb: 2 }}>
        Please check below to indicate that you understand this and are ready to
        continue to the first task.
      </RegularText>
      <Stack
        sx={{ px: 4 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label={
            <b>I understand the instructions above and am ready to continue</b>
          }
          onClick={() => setChecked(!checked)}
        />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
        <Button
          variant="contained"
          disabled={!checked}
          onClick={() => setCheckIntroduction(true)}
        >
          Cotinue
        </Button>
      </Box>
    </Container>
  );
}
