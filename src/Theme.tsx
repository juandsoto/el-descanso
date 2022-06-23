import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import React from "react";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    primary: {
      main: "#0cb0a9",
    },
    error: {
      main: "#f53b57",
    },

    mode,
    ...(mode === "light"
      ? {
          secondary: {
            main: "#9c27b0",
          },

          color: {
            invert: "#fff",
          },

          grid: {
            "1": "#f53b57",
            "2": "#ffa801",
            "3": "#575fcf",
            "4": "#05c46b",
          },
          warning: {
            main: "#ffa801",
          },
        }
      : {
          secondary: {
            main: "#9c27b0",
          },
          color: {
            invert: "#000",
          },
          grid: {
            "1": "#f53b57",
            "2": "#ffa801",
            "3": "#575fcf",
            "4": "#05c46b",
          },
          warning: {
            main: "#ffa801",
          },
        }),
  },
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light" as PaletteMode,
});

const Theme = ({ children }: any) => {
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    const storedMode = localStorage.getItem("theme");
    return (storedMode ? storedMode : "light") as PaletteMode;
  });
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

  React.useEffect(() => localStorage.setItem("theme", mode), [mode]);
  // Update the theme only if the mode changes
  let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={{ ...colorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
