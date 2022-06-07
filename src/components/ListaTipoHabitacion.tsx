import React from "react";
import { Typography, useTheme, Stack } from "@mui/material";
import { tipoHabitaciones } from "../data";
import TipoHabitacion from "./TipoHabitacion";
import useAxios from "../hooks/useAxios";
import ITipoHabitacion from "../interfaces/TipoHabitacion";

const ListaTipoHabitacion = (): JSX.Element => {
  const [{ data }] = useAxios<ITipoHabitacion[]>("/tipohabitaciones/");

  const habitaciones = React.useMemo(
    () =>
      data?.map(h => ({
        ...h,
        images: tipoHabitaciones.find(th => th.tipo === h.tipo)?.images || [],
        servicios:
          tipoHabitaciones.find(th => th.tipo === h.tipo)?.servicios || [],
      })),
    [data]
  );

  const theme = useTheme();
  return (
    <Stack direction="row" flexDirection="column" justifyContent="start">
      <Typography
        variant="h4"
        component="h2"
        color={theme.palette.primary.main}
        textAlign="center"
      >
        Tipos de habitaciones
      </Typography>
      <Stack
        // className="hide-scrollbar-x_xs"
        className="hide-scrollbar-x"
        direction="row"
        gap={1}
        sx={{
          overflowX: "scroll",
          // cursor: "grab",
        }}
        py={2}
      >
        {habitaciones
          ?.sort((a, b) => a.precio - b.precio)
          .map((habitacion, index) => {
            return (
              <TipoHabitacion
                key={index}
                habitacion={habitacion}
                minWidth="350px"
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

export default ListaTipoHabitacion;
