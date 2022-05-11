import { Typography, useTheme, Stack } from "@mui/material";
import { tipoHabitaciones } from "../data";
import TipoHabitacion from "./TipoHabitacion";

const ListaTipoHabitacion = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack direction="row" flexDirection="column" justifyContent="start">
      <Typography
        variant="h4"
        component="h2"
        color={theme.palette.primary.main}
        textAlign="center"
      >
        Habitaciones
      </Typography>
      <Stack
        className="hide-scrollbar"
        direction="row"
        gap={1}
        sx={{ overflowX: "scroll", cursor: "grab" }}
        py={2}
      >
        {tipoHabitaciones.map((habitacion, index) => {
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