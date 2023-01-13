import React from "react";
import { Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import InfoPanel from "./InfoPanel";
import TablePanel from "./TablePanel";
import { useSessionState } from "../../redux/sessionState";
import BingSearch from "../../components/BingSearch";
import ChatGPT from "../../components/ChatGPT";

export default function MainPage() {
  const { searchUnit } = useSessionState();
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid xs={12} sm={6} direction="column">
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
        </Grid>
        <Grid
          component={Divider}
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Grid xs={12} sm sx={{ overflowY: "auto" }}>
          {searchUnit === "Bing" ? <BingSearch /> : <ChatGPT />}
        </Grid>
      </Grid>
    </Paper>
  );
}

