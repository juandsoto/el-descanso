import { Box, useTheme } from "@mui/material";
import {
  UserLayout,
  UserLayoutLeft,
  UserLayoutRight,
  Usuarios,
  Estadisticas,
  HabitacionesList,
  Servicios,
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
          <HabitacionesList />
          <Servicios fullWidth />
          Reservas
          <Usuarios />
          Clientes
        </Box>
      </UserLayoutRight>
    </UserLayout>
  );
};

export default Admin;
