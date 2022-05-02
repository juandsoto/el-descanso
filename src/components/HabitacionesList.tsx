import { Typography, useTheme, Stack } from "@mui/material";
import { habitaciones } from "../data";
import Habitacion from "./Habitacion";

const HabitacionesList = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack direction="row" flexDirection="column" justifyContent="start">
      <Typography
        variant="h4"
        component="h2"
        padding={2}
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
        pb={1}
      >
        {habitaciones.map((habitacion, index) => {
          return (
            <Habitacion key={index} habitacion={habitacion} minWidth="350px" />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default HabitacionesList;
