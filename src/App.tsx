import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useThemeState } from "./redux/themeState";
import ThemeToggler from "./components/ThemeToggler";
import { Outlet } from "react-router-dom";

function App() {
  const { mode } = useThemeState();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggler />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
