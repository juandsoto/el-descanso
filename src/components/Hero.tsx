import {
  Stack,
  Box,
  Button,
  Grid,
  Theme,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import hero from "../assets/images/banner.jpg";

const Hero = (): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <Stack
      className="hero-container"
      padding="20px 40px"
      sx={{
        height: "90%",
        overflowY: "hidden",
      }}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <SmallDevice theme={theme} />
      <BigDevice theme={theme} />
    </Stack>
  );
};

const SmallDevice = (props: { theme: Theme }): JSX.Element => {
  const { theme } = props;
  return (
    <Box
      sx={{ display: { xs: "flex", sm: "none" } }}
      flexDirection="column"
      position="relative"
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          position: "absolute",
          borderRadius: "20px",
          width: "70%",
          transform: "translate(20%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography component="span" color={theme.palette.text.primary}>
          HOTEL
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: "2rem",
            letterSpacing: "3px",
            color: theme.palette.primary.main,
            textShadow: "-1px 0px 1px #000",
          }}
        >
          El Descanso
        </Typography>
      </Box>
      <Box width="95vw" borderRadius="20px" boxShadow="0px 0px 10px #000">
        <img
          src={hero}
          alt="hero"
          width="100%"
          height="100%"
          style={{ borderRadius: "20px", zIndex: -1 }}
        />
      </Box>
    </Box>
  );
};

const BigDevice = (props: { theme: Theme }): JSX.Element => {
  const { theme } = props;
  return (
    <Grid
      container
      spacing={4}
      sx={{ display: { xs: "none", sm: "flex" } }}
      maxHeight="100%"
    >
      <Grid
        display="block"
        item
        sm={12}
        md={4}
        mt={4}
        textAlign="center"
        zIndex={3}
      >
        <Typography component="span" color={theme.palette.text.primary}>
          HOTEL
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: "2.5rem",
            letterSpacing: "2px",
            color: theme.palette.primary.main,
            textShadow: "-1px 0px 1px #000",
          }}
        >
          El Descanso
        </Typography>
        <Typography
          component="p"
          margin="20px 0px"
          sx={{ color: theme.palette.text.secondary }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
          quo illum adipisci doloribus nostrum accusantium consequuntur
          similique maxime corporis? Impedit.
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate,
          fugit!
        </Typography>
        <Link
          component={Button}
          underline="none"
          href="#reservar"
          color="primary"
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: "0 0 4px #000",
          }}
        >
          ¡Reserva ya!
        </Link>
      </Grid>
      <Grid item sm={12} md={8}>
        <img
          src={hero}
          alt="hero"
          width="100%"
          height="100%"
          style={{
            borderRadius: "20px",
            boxShadow: "0px 0px 10px #000",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
