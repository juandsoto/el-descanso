import { Grid } from "@mui/material";
import React from "react";
import {
  UserLayout,
  UserLayoutLeft,
  UserLayoutRight,
  Solicitudes,
  Descuento,
} from "../components";
import Checkin from "../components/ConsultarReserva";
import CustomStepper from "../components/CustomStepper";

const Recepcionista = (): JSX.Element => {
  const [openReservaModal, setOpenReservaModal] =
    React.useState<boolean>(false);

  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Recepcionista">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Descuento />
          </Grid>
          <Grid item xs={12} md={9}>
            <Solicitudes />
          </Grid>
          <Grid item xs={12} sx={{ minHeight: "80vh" }}>
            <CustomStepper />
          </Grid>
          <Grid item xs={12}>
            <Checkin />
          </Grid>
        </Grid>
      </UserLayoutRight>
    </UserLayout>
  );
};

export default Recepcionista;
