import React from "react";
import { Box } from "@mui/material";
import EditableTable from "../../components/EditableTable";

export default function TablePanel() {
  return (
    <Box component="div" sx={{ px: 2 }}>
      <EditableTable />
    </Box>
  );
}
