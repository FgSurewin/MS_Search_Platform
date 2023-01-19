import React from "react";
import { Box, Typography } from "@mui/material";
import EditableTable from "../../components/EditableTable";

export default function TablePanel() {
  return (
    <Box component="div" sx={{ px: 4 }}>
      <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
        Please{" "}
        <b>
          use the interface on the right to research these products and make a
          decision
        </b>{" "}
        on which one to choose.{" "}
        <b>
          Make sure to include the year, make, model, and trim in your searches
        </b>{" "}
        to get precise information.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <b>When you have found the best product</b> to purchase based on the
        above criteria, <b>click the corresponding “Choose” button</b> in the
        table below.
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Feel free to{" "}
        <b>
          use the table below to keep track of the information you search for
        </b>{" "}
        and compare the products you are considering.
      </Typography>
      <EditableTable />
    </Box>
  );
}
