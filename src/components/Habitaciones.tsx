import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { habitaciones } from "../data";
import Habitacion from "./Habitacion";

const Habitaciones = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack
      margin={{ xs: "0 10px", md: "0px 100px" }}
      direction="row"
      flexDirection="column"
      justifyContent="start"
    >
      <Box textAlign="center">
        <Typography
          color={theme.palette.primary.main}
          variant="h4"
          component="h2"
          padding={2}
        >
          Habitaciones
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        pt={2}
        justifyContent="space-evenly"
        alignItems="start"
      >
        {habitaciones.map((habitacion, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Habitacion habitacion={habitacion} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Habitaciones;
