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
import useAxios from "../hooks/useAxios";

const ReservarFormulario = (): JSX.Element => {
  const theme = useTheme();
  const [_, postData] = useAxios(
    {
      url: "/solicitud/",
      method: "POST",
    },
    { manual: true }
  );
  const { form, handleChange, reset } = useForm<
    Omit<ISolicitud, "id" | "estado">
  >({
    email: "",
    nombre: "",
    telefono: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData({
      data: form,
    });
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
      p={1}
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
        p={4}
        borderRadius="20px"
        bgcolor="background.default"
        boxShadow="0px 10px 31px 13px rgba(0,0,0,0.1)"
      >
        <Typography variant="h4" component="h2" color="primary.main">
          Reservar
        </Typography>
        <Typography
          component="p"
          textAlign="center"
          mt={2}
          color="text.primary"
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
            id="email"
            label="Correo"
            name="email"
            value={form.email}
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
          <Typography
            component="p"
            textAlign="center"
            mt={2}
            color="text.primary"
          >
            ó llamanos al +57 3173461739
          </Typography>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservarFormulario;
