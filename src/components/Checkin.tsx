import React from "react";
import Stack from "@mui/material/Stack";
import { hardReservas } from "../data/index";
import { Typography } from "@mui/material";

const Checkin = () => {
  return (
    <Stack>
      <Typography color="primary.main" variant="h4" component="h2">
        Consultar reserva
      </Typography>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* <Typography  */}
      </Stack>
    </Stack>
  );
};

export default Checkin;
