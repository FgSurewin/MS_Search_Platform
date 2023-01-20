import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useThemeState } from "./redux/themeState";
import ThemeToggler from "./components/ThemeToggler";
import Environment from "./pages/Environment";
// import { Outlet } from "react-router-dom";

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
      {/* <Outlet /> */}
      <Environment />
    </ThemeProvider>
  );
}

export default App;
