import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { LogoImage } from "../assets/images";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

const ReservarFormulario = (): JSX.Element => {
  const [send, setSend] = React.useState(false);
  const theme = useTheme();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      telefono: data.get("telefono"),
    });
    setSend(true);
    setTimeout(() => setSend(false), 2000);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      flexWrap="wrap"
      alignItems="center"
      minHeight="100vh"
      pb={1}
      sx={{
        position: "relative",
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(12,176,169,1) 200%)`,
      }}
    >
      <Box>
        <img src={LogoImage} alt="logo" width="100%" height="100%" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={6}
        borderRadius="20px"
        bgcolor={theme.palette.background.default}
        boxShadow="0px 10px 31px 13px rgba(0,0,0,0.1)"
      >
        <Typography
          variant="h4"
          component="h2"
          color={theme.palette.primary.main}
        >
          Reservar
        </Typography>
        <Typography
          component="p"
          textAlign="center"
          mt={2}
          color={theme.palette.text.primary}
        >
          Envíanos tu correo y tu número de telefono para contactarte
        </Typography>
        <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            name="telefono"
            label="Teléfono"
            type="tel"
            id="telephone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Enviar
          </Button>
        </Box>
      </Box>
      {send && (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            left: "1rem",
            bottom: "1rem",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <AlertTitle>¡Genial!</AlertTitle>
          Hemos recibido tu solicitud — <strong>¡pronto de llamaremos!</strong>
        </Alert>
      )}
    </Box>
  );
};

export default ReservarFormulario;
