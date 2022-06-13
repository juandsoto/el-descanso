import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useTheme,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../context/auth/index";
import ILogin from "../interfaces/Login";
import { ThemeSwitch } from "../components";
import useForm from "../hooks/useForm";
import useAxios from "../hooks/useAxios";
import { ILoginResponse } from "../interfaces/api/LoginResponse";
import { Rol } from "../interfaces/Usuario";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Copyright = (props: any): JSX.Element => {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link href="#">El Descanso | PYTS_TEAM</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = (): JSX.Element => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { form, handleChange } = useForm<ILogin>({
    username: "",
    password: "",
  });
  const theme = useTheme();

  const [{ response, loading, error }, login] = useAxios<
    ILoginResponse,
    ILogin
  >(
    {
      url: "/login/",
      method: "POST",
    },
    { manual: true }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.password.length || !form.username.length) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    login({
      data: form,
    });
  };

  React.useEffect(() => {
    if (!response) return;
    const rol: Rol = response.data.user.rol.toLowerCase()! as Rol;
    console.log({ response });
    setUser({ ...response.data.user, rol, token: response.data.access });
    navigate(`/el-descanso/${rol}`, {
      replace: true,
    });
  }, [response]);

  React.useEffect(() => {
    error && toast.error(error?.response?.data.Error);
  }, [error]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[500],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              py: 8,
              px: 4,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.default",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="contraseña"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setShowPassword(prev => !prev)}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                fullWidth
                variant={loading ? "outlined" : "contained"}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={25} /> : "Entrar"}
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 12px",
          borderRadius: "20px",
          bgcolor: theme.palette.background.default,
        }}
      >
        <ThemeSwitch />
      </Box>
    </>
  );
};

export default Login;
