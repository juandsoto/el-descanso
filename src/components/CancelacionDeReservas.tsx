import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/auth/index";
import CircularProgress from "@mui/material/CircularProgress";

const CancelacionDeReservas = () => {
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };
  const [{ data: cancelacion, loading, error }] = useAxios<{
    porcentaje_cancelacion: number;
  }>({
    url: "/porcentajecancelacion/",
    headers,
  });

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h5" component="h3" color="error.main">
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
          bgcolor: loading ? "transparent" : "error.main",
          borderRadius: "50px",
          height: "70px",
          width: "70px",
        }}
      >
        {loading ? (
          <CircularProgress color="error" />
        ) : (
          <Box component="span">
            {cancelacion?.porcentaje_cancelacion.toFixed(2)}%
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default CancelacionDeReservas;
