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
      // main: "#00F",
    },
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          secondary: {
            main: "#9c27b0",
          },
        }
      : {
          // palette values for dark mode
          secondary: {
            main: "#9c27b0",
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
