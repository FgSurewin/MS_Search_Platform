import React from "react";
import { Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeState } from "../../redux/themeState";

export default function ThemeToggler() {
  const { mode, setMode } = useThemeState();
  return (
    <Box
      sx={{
        // display: "flex",
        // width: "100%",
        // alignItems: "center",
        // justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 10,
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        color="inherit"
      >
        {mode === "light" ? (
          <Brightness4 fontSize="medium" />
        ) : (
          <Brightness7 fontSize="medium" />
        )}
      </IconButton>
    </Box>
  );
}
