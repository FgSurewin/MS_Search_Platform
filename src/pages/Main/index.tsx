import React from "react";
import { Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import InfoPanel from "./InfoPanel";
import TablePanel from "./TablePanel";
import { useSessionState } from "../../redux/sessionState";
import BingSearch from "../../components/BingSearch";
import ChatGPT from "../../components/ChatGPT";
import { useFeedbackState } from "../../redux/feedbackState";
import Feedback from "../../components/Feedback";
import { useAssignmentState } from "../../redux/assignmentState";
import moment from "moment";

export default function MainPage() {
  const { searchUnit } = useSessionState();
  const { isOpen } = useFeedbackState();
  const { initSessionState } = useSessionState();
  const { product_pairs, curr_task_idx, search_unit } = useAssignmentState();

  React.useEffect(() => {
    initSessionState({
      groundTruth: product_pairs[curr_task_idx],
      searchUnit: search_unit,
      workerId: "test_worker",
      taskNum: (curr_task_idx + 1).toString(),
      selectedDimensions: ["cargo_space", "length"],
      startTimestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  }, [initSessionState, curr_task_idx, product_pairs, search_unit]);

  return (
    <Paper component="section">
      <Grid container>
        <Grid xs={12} sm={6} direction="column" sx={{ position: "relative" }}>
          <Grid xs={12}>
            <InfoPanel />
          </Grid>
          <Grid
            component={Divider}
            orientation="horizontal"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Grid xs={12}>
            <TablePanel />
          </Grid>
          {isOpen && (
            <Grid
              xs={12}
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1000,
                background: "rgba(255, 255, 255, 0.6)",
                top: 0,
                left: 0,
              }}
            ></Grid>
          )}
        </Grid>
        <Grid
          component={Divider}
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Grid
          xs={12}
          sm
          sx={{
            height: "100vh",
            overflowY: "auto",
          }}
        >
          {isOpen ? (
            <Feedback />
          ) : searchUnit === "Bing" ? (
            <BingSearch />
          ) : (
            <ChatGPT />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

