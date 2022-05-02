import { Box, Switch } from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../Theme";

const ThemeSwitch = (): JSX.Element => {
  const { toggleColorMode, mode } = React.useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {mode === "dark" ? (
        <LightModeIcon htmlColor="#FFFF00" />
      ) : (
        <DarkModeIcon htmlColor="#1D1D1D" />
      )}
      <Switch color="primary" onClick={toggleColorMode} />
    </Box>
  );
};

export default ThemeSwitch;
