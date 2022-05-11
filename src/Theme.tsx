import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React from "react";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    primary: {
      main: "#0cb0a9",
      // main: "#00F",
    },
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
        }),
  },
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light" as PaletteMode,
});

const Theme = ({ children }: any) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ ...colorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
