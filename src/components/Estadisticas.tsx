import { Grid, Stack } from "@mui/material";
import OcupacionHotelChart from "./OcupacionHotelChart";
import UsoDeServiciosChart from "./UsoDeServiciosChart";
import CancelacionDeReservas from "./CancelacionDeReservas";
import VentasPorServicioChart from "./VentasPorServicioChart";
import VentasMensualesChart from "./VentasMensualesChart";
import Descuento from "./Descuento";

const Estadisticas = (): JSX.Element => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={7} lg={8} position="relative">
        <OcupacionHotelChart />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <UsoDeServiciosChart />
      </Grid>
      <Grid item xs={12}>
        <Stack
          textAlign="center"
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-around"
          sx={{ gap: 2 }}
        >
          <Descuento type="persona natural" />
          <CancelacionDeReservas />
          <Descuento type="cliente corporativo" />
        </Stack>
      </Grid>
      <Grid item xs={12} position="relative">
        <VentasPorServicioChart />
      </Grid>
      <Grid item xs={12} position="relative">
        <VentasMensualesChart />
      </Grid>
    </Grid>
  );
};

export default Estadisticas;
