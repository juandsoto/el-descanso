import { Grid } from "@mui/material";
import React from "react";
import {
  UserLayout,
  UserLayoutLeft,
  UserLayoutRight,
  Solicitudes,
  Descuento,
} from "../components";
import ConsultarReserva from "../components/ConsultarReserva";
import CustomStepper from "../components/CustomStepper";
import { useAuth } from "../context/auth/index";

const Recepcionista = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Recepcionista">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Solicitudes />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            flexWrap="wrap"
          >
            <Descuento type="persona natural" />
            <Descuento type="cliente corporativo" />
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <ConsultarReserva />
          </Grid>
          {user.rol !== "gerente" && (
            <Grid item xs={12} sx={{ mt: 4, minHeight: "80vh" }}>
              <CustomStepper />
            </Grid>
          )}
        </Grid>
      </UserLayoutRight>
    </UserLayout>
  );
};

export default Recepcionista;
