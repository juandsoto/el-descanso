import { Box, useTheme, Stack } from "@mui/material";
import {
  Navbar,
  Hero,
  ReservarFormulario,
  Servicios,
  ThemeSwitch,
  ListaTipoHabitacion,
} from "../components";

const Home = (): JSX.Element => {
  return (
    <Stack
      spacing={10}
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Box height="100vh">
        <Navbar />
        <Hero />
      </Box>
      <Box id="habitaciones" px={2}>
        <ListaTipoHabitacion />
      </Box>
      <Box id="servicios" px={2}>
        <Servicios bgImage />
      </Box>

      <Box minHeight="100vh" id="reservar">
        <ReservarFormulario />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          backgroundColor: "white",
          padding: "4px 12px",
          borderRadius: "20px",
          bgcolor: "background.default",
          zIndex: 99,
        }}
      >
        <ThemeSwitch />
      </Box>
    </Stack>
  );
};

export default Home;
