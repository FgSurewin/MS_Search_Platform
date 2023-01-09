import React from "react";
import { Paper, Grid, Divider } from "@mui/material";
import InfoPanel from "./InfoPanel";
import TablePanel from "./TablePanel";

export default function MainPage() {
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
          overflow: "auto",
        }}
      >
        <Grid item container xs={12} sm={6} direction="column">
          <Grid item xs={6}>
            <InfoPanel />
          </Grid>
          <Grid
            item
            component={Divider}
            orientation="horizontal"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Grid item xs={5}>
            <TablePanel />
          </Grid>
        </Grid>
        <Grid
          item
          component={Divider}
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Grid item xs={12} sm={5}>
          Right
        </Grid>
      </Grid>
    </Paper>
  );
}

// <Divider  flexItem sx={{ xs: 0 }}></Divider>
