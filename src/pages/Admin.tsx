import { Box, useTheme } from "@mui/material";
import Habitaciones from "../components/Habitaciones";
import {
  UserLayout,
  UserLayoutLeft,
  UserLayoutRight,
  Usuarios,
  Estadisticas,
  ListaTipoHabitacion,
  Servicios,
  Clientes,
} from "../components";

const Admin = () => {
  const theme = useTheme();
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Administrador">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            color: theme.palette.text.primary,
          }}
        >
          <Estadisticas />
          <ListaTipoHabitacion />
          <Habitaciones />
          <Servicios fullWidth />
          <Usuarios />
          <Clientes />
        </Box>
      </UserLayoutRight>
    </UserLayout>
  );
};

export default Admin;
