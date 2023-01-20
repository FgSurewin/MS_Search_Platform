import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
// import FeedbackTable from "./FeedbackTable";
import FeedbackTable2 from "./FeedbackTable2";
import { useSessionState } from "../../redux/sessionState";
import { makeDecision } from "./FeedbackTable2";
import { useAssignmentState } from "../../redux/assignmentState";
import { useFeedbackState } from "../../redux/feedbackState";
import SurveyDialog from "../Dialog/SurveyDialog";

export default function Feedback() {
  const { finalDecision, groundTruth } = useSessionState();
  const { setIsOpen } = useFeedbackState();
  const { hasFeedback, curr_task_idx, product_pairs, updataTaskIdx } =
    useAssignmentState();
  const isCorrectDecision = React.useMemo(() => {
    return (
      finalDecision ===
      `${makeDecision(groundTruth).make} ${makeDecision(groundTruth).model}`
    );
  }, [finalDecision, groundTruth]);

  const [openSurveyDialog, setOpenSurveyDialog] = React.useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          height: "100%",
          px: 3,
        }}
      >
        {hasFeedback && (
          <>
            <Typography variant="body1">
              You selected the 2020 <b>{finalDecision}</b>. Based on the most
              accurate data we have access to, shown in the table below, that is
              the{" "}
              <b style={{ color: isCorrectDecision ? "green" : "red" }}>
                {isCorrectDecision ? "correct" : "incorrect"}
              </b>{" "}
              decision.
            </Typography>
            <FeedbackTable2 />
          </>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Thanks for completing this task {curr_task_idx + 1} of{" "}
          {product_pairs.length}. Click below to continue to the next task.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            console.log("curr_task_idx-> ", curr_task_idx);
            if (curr_task_idx + 1 === product_pairs.length) {
              console.log("Survey Code");
              // TODO: Set loading Spinner
              // TODO: Save all data to database
              // TODO: Display survey code dialog
              setOpenSurveyDialog(true);
            } else {
              updataTaskIdx(curr_task_idx + 1);
              setIsOpen(false);
            }
          }}
        >
          {curr_task_idx + 1 === product_pairs.length
            ? "Generate Survey Code"
            : "Continue to the next task"}
        </Button>
      </Stack>
      <SurveyDialog
        open={openSurveyDialog}
        handleClose={() => {
          window.open("", "_self", "")!.close();
        }}
        code="123456"
        title="Survey Code"
      />
    </Box>
  );
}
