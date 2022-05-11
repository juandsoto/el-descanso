import {
  Tooltip as MuiTooltip,
  Box,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LineChart from "./LineChart";
import React from "react";
import EditDialog from "./EditDialog";
import { ocupacionHotel, usoDeServicios } from "../data";
import { Bar, Line } from "react-chartjs-2";
import { useAuth } from "../context/auth/index";

const Estadisticas = (): JSX.Element => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <Bar options={usoDeServicios.options} data={usoDeServicios.data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Line options={ocupacionHotel.options} data={ocupacionHotel.data} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack
          spacing={4}
          textAlign="center"
          direction={{ xs: "row", md: "column" }}
          alignItems="center"
          justifyContent="center"
        >
          <Descuento />
          <Cancelacion />
        </Stack>
      </Grid>
      <Grid item xs={12} md={9}>
        <LineChart />
      </Grid>
    </Grid>
  );
};

const Cancelacion = (): JSX.Element => {
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
        <Typography variant="caption" component="span">
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

export const Descuento = (): JSX.Element => {
  const [value, setValue] = React.useState<number>(5);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          component="h3"
          color={theme.palette.primary.main}
        >
          Descuento
        </Typography>
        <Typography variant="caption" component="span">
          ofrecido a clientes habituales
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          fontSize: "1.5rem",
          bgcolor: theme.palette.primary.main,
          height: "70px",
          width: "70px",
          borderRadius: "50px",
        }}
      >
        {user.rol === "administrador" ? (
          <>
            <MuiTooltip title="click para editar">
              <Box
                component="span"
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenDialog(true)}
              >
                {value.toFixed(2)}%
              </Box>
            </MuiTooltip>
            <EditDialog
              open={openDialog}
              handleClose={() => setOpenDialog(false)}
              inputType="number"
              dialogInfo={{
                title: "Editar Descuento",
                name: "descuento",
                description: `Cambiar descuento para los clientes habituales`,
                onCancel: () => setOpenDialog(false),
                onConfirm: (value: number) => {
                  setValue(value);
                  setOpenDialog(false);
                },
              }}
            />
          </>
        ) : (
          <Box component="span">{value.toFixed(2)}%</Box>
        )}
      </Stack>
    </Stack>
  );
};

export default Estadisticas;
