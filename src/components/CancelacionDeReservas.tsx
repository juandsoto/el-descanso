import React from "react";
import { Stack, Box, Typography } from "@mui/material";

const CancelacionDeReservas = () => {
  const [cancelacion, setCancelacion] = React.useState(0);

  React.useEffect(() => {
    setCancelacion(3);
  }, []);
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h5" component="h3" color="#f00">
          Cancelacion
        </Typography>
        <Typography textAlign="center" variant="caption" component="span">
          porcentaje de cancelacion de reservas
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          fontSize: "1.5rem",
          bgcolor: "#f00",
          borderRadius: "50px",
          height: "70px",
          width: "70px",
        }}
      >
        <Box component="span">{cancelacion.toFixed(2)}%</Box>
      </Stack>
    </Stack>
  );
};

export default CancelacionDeReservas;
