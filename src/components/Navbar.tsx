import { Stack, Button, Container, Link, useTheme } from "@mui/material";
import Logo from "./Logo";

const Navbar = (): JSX.Element => {
  return (
    <Container
      component="nav"
      maxWidth={false}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10%",
      }}
    >
      <Logo />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{
          gap: { xs: 2, md: 4 },
        }}
      >
        <Link
          component={Button}
          underline="none"
          href="#habitaciones"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Habitaciones
        </Link>
        <Link
          component={Button}
          underline="none"
          href="#servicios"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Servicios
        </Link>
        <Link
          component={Button}
          underline="none"
          href="#reservar"
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundColor: "primary.main",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
        >
          Reservar
        </Link>
      </Stack>
    </Container>
  );
};

export default Navbar;
