import React from "react";
import {
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
import useForm from "../hooks/useForm";
import ISolicitud from "../interfaces/Solicitud";
import toast from "react-hot-toast";

const ReservarFormulario = (): JSX.Element => {
  const [send, setSend] = React.useState(false);
  const theme = useTheme();
  const { form, handleChange, reset } = useForm<Omit<ISolicitud, "id">>({
    correo: "",
    nombre: "",
    telefono: "",
    estado: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend(true);
    console.log(form);
    reset();
    toast.success(
      "¡Genial! Hemos recibido tu solicitud. Pronto te llamaremos",
      {
        duration: 3500,
      }
    );
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
        background: `linear-gradient(180deg, ${theme.palette.background.default} 50%, rgba(12,176,169,1) 80%)`,
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
            id="nombre"
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="name"
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
            id="correo"
            label="Correo"
            name="correo"
            value={form.correo}
            onChange={handleChange}
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
            id="telefono"
            name="telefono"
            label="Teléfono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
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
    </Box>
  );
};

export default ReservarFormulario;
