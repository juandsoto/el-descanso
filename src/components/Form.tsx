import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useForm from "../hooks/useForm";
import { IUsuario } from "../interfaces/Usuario";

interface FormProps<T> {
  editing: T;
  width: string;
  handleClose: () => void;
  type: "usuario" | "cliente";
}

const Form = <T extends IUsuario>(props: FormProps<T>): JSX.Element => {
  const { form, handleChange, handleSubmit, handleSelectChange } = useForm<T>(
    props.editing
  );
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ width: props.width, padding: "2rem 1rem" }}
    >
      {props.type === "usuario" && (
        <UsuarioForm
          handleClose={props.handleClose}
          editing={props.editing}
          {...{ form, handleChange, handleSelectChange }}
        />
      )}
      {/* {props.type === "cliente" && <ClienteForm/>} */}
    </Box>
  );
};

interface UsuarioFormProps {
  editing: IUsuario;
  form: IUsuario;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSelectChange: (e: SelectChangeEvent) => void;
}

const UsuarioForm = (props: UsuarioFormProps): JSX.Element => {
  const { form, handleChange, handleClose, handleSelectChange } = props;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        color={theme.palette.primary.main}
      >
        Editando Usuario
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        name="nombre"
        label="Nombre"
        type="name"
        id="nombre"
        autoComplete="name"
        value={form.nombre}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="usuario"
        label="Usuario"
        name="usuario"
        autoComplete="username"
        value={form.usuario}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="contrasena"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        id="contrasena"
        autoComplete="current-password"
        value={form.contraseña}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword(prev => !prev)}
              sx={{ cursor: "pointer" }}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </InputAdornment>
          ),
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="rol-label">Rol</InputLabel>
        <Select
          labelId="rol-label"
          id="rol"
          value={form.rol}
          name="rol"
          label="rol"
          onChange={handleSelectChange}
        >
          <MenuItem value="recepcionista">Recepcionista</MenuItem>
          <MenuItem value="gerente">Gerente</MenuItem>
          <MenuItem value="cajero">Cajero</MenuItem>
          <MenuItem value="administrador">Administrador</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        id="telefono"
        label="Teléfono"
        name="telefono"
        autoComplete="tel"
        value={form.telefono}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleClose}
      >
        Aceptar
      </Button>
    </>
  );
};

export default Form;
