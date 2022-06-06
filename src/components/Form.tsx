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
import ICliente from "../interfaces/Cliente";

interface FormProps<T> {
  editing: Omit<T, "password">;
  onConfirm: (row: T) => void;
  width: string;
  handleClose: () => void;
  type: "usuario" | "cliente";
  creating?: boolean;
}

const Form = <T extends Partial<IUsuario & ICliente>>(
  props: FormProps<T>
): JSX.Element => {
  const { form, handleChange, handleSubmit, handleSelectChange } = useForm<T>(
    () => {
      if (props.type === "usuario")
        return { ...props.editing, password: "" } as T;
      return props.editing as T;
    }
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      bgcolor="background.default"
      height="100%"
      sx={{ width: props.width, padding: "2rem 1rem" }}
    >
      <Typography
        variant="h5"
        component="h3"
        color="primary.main"
        textTransform="capitalize"
      >
        {props.creating ? "creando" : "editando"} {props.type}
      </Typography>
      {props.type === "usuario" && (
        <UsuarioForm
          handleClose={props.handleClose}
          editing={props.editing}
          onConfirm={
            props.onConfirm as (row: Partial<ICliente & ICliente>) => void
          }
          {...{ form, handleChange, handleSelectChange }}
        />
      )}
      {props.type === "cliente" && (
        <ClienteForm
          handleClose={props.handleClose}
          onConfirm={
            props.onConfirm as (row: Partial<ICliente & ICliente>) => void
          }
          editing={props.editing}
          {...{ form, handleChange, handleSelectChange }}
        />
      )}
    </Box>
  );
};

interface UsuarioFormProps {
  editing: Partial<IUsuario>;
  onConfirm: (row: Partial<IUsuario & ICliente>) => void;
  form: Partial<IUsuario>;
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
      {!props.editing.id && (
        <TextField
          margin="normal"
          autoFocus
          fullWidth
          name="id"
          label="Identificación"
          type="text"
          id="id"
          autoComplete="id"
          value={form.id}
          onChange={handleChange}
        />
      )}
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
        name="username"
        autoComplete="username"
        value={form.username}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
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
        onClick={() => props.onConfirm(form as IUsuario)}
      >
        Aceptar
      </Button>
    </>
  );
};
interface ClienteFormProps {
  editing: Partial<ICliente>;
  onConfirm: (row: Partial<ICliente>) => void;
  form: Partial<ICliente>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

const ClienteForm = (props: ClienteFormProps): JSX.Element => {
  const { form, handleChange, handleClose } = props;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const theme = useTheme();
  return (
    <>
      {!props.editing.no_identificacion && (
        <TextField
          margin="normal"
          fullWidth
          name="no_identificacion"
          autoFocus
          label="Identificación"
          type="text"
          id="id"
          autoComplete="id"
          value={form.no_identificacion}
          onChange={handleChange}
        />
      )}
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
        id="telefono"
        label="Teléfono"
        name="telefono"
        autoComplete="tel"
        value={form.telefono}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="correo"
        label="Correo"
        name="correo"
        autoComplete="tel"
        value={form.correo}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => props.onConfirm(form)}
      >
        Aceptar
      </Button>
    </>
  );
};

export default Form;
