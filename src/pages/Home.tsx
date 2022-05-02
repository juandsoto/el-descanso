import { Box, useTheme } from "@mui/material";
import {
  Navbar,
  Hero,
  ReservarFormulario,
  Habitaciones,
  Servicios,
  ThemeSwitch,
} from "../components";

const Home = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box height="100vh">
        <Navbar />
        <Hero />
      </Box>
      <Box minHeight="100vh" id="habitaciones">
        <Habitaciones />
      </Box>

      <Box height="100vh" id="servicios">
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
          bgcolor: theme.palette.background.default,
        }}
      >
        <ThemeSwitch />
      </Box>
    </Box>
  );
};

export default Home;
