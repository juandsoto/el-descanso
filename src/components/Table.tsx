import {
  Box,
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Stack,
  Checkbox,
} from "@mui/material";
import { IUsuario } from "../interfaces/Usuario";
import React from "react";
import EditDrawer from "./EditDrawer";
import ConfirmDialog from "./ConfirmDialog";
import { useTheme } from "@mui/material/styles";
import ICliente from "../interfaces/Cliente";
import { useAuth } from "../context/auth";
import { useReserva } from "../context/reserva/index";
import IReserva from "../interfaces/Reserva";

interface TableProps<T> {
  title: string;
  rows: T[];
  type: "usuario" | "cliente";
  fullWidth?: boolean;
  initialSelected: T;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CLIENTE: ICliente = {
  id: "",
  nombre: "",
  telefono: "",
  correo: "",
};

const USUARIO: IUsuario = {
  id: "",
  nombre: "",
  usuario: "",
  telefono: "",
  contraseña: "",
  rol: "",
};

const Table = <T extends Partial<IUsuario & ICliente>>(
  props: TableProps<T>
): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<T>(props.initialSelected);
  const { user } = useAuth();
  const theme = useTheme();

  let SUBJECT: ICliente | IUsuario =
    props.type === "usuario" ? USUARIO : CLIENTE;

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: 2,
        }}
      >
        <Stack
          spacing={2}
          width="100%"
          direction="row"
          alignItems="end"
          justifyContent="space-between"
        >
          <Typography
            variant="h4"
            component="h2"
            color="primary.main"
            fontSize={{ xs: "1.5rem", sm: "2rem" }}
          >
            {props.title}
          </Typography>
          <TextField
            id="standard-basic"
            label="Buscar..."
            variant="standard"
            value={props.search}
            onChange={props.onChangeSearch}
          />
        </Stack>
        <TableContainer
          className="hide-scrollbar_xs"
          component={Paper}
          sx={{
            width: `${props.fullWidth ? "100%" : "80%"}`,
            maxHeight: "400px",
            boxShadow: `2px 2px 7px ${theme.palette.grey[900]}`,
          }}
        >
          <MuiTable
            stickyHeader
            sx={{ minWidth: 650, bgcolor: "background.default" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {Object.keys(SUBJECT).map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {column}
                  </TableCell>
                ))}
                {props.type === "cliente" && (
                  <TableCell align="center">Seleccionar</TableCell>
                )}
                {user.rol === "administrador" && (
                  <>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {Object.values(row).map((cell: string, index) => {
                      return (
                        <TableCell align="center" key={index}>
                          {cell}
                        </TableCell>
                      );
                    })}
                    {props.type === "cliente" && (
                      <TableCell align="center">
                        <CheckCliente cliente={row as ICliente} />
                      </TableCell>
                    )}
                    {user.rol === "administrador" && (
                      <>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setSelected(row);
                              setIsEditing(true);
                            }}
                          >
                            editar
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setIsDeleting(true)}
                          >
                            eliminar
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
      <EditDrawer
        handleClose={() => setIsEditing(false)}
        open={isEditing}
        editing={selected}
        type={props.type}
      />
      <ConfirmDialog
        open={isDeleting}
        handleClose={() => setIsDeleting(false)}
        dialogInfo={{
          title: `Eliminar ${props.type}`,
          description: `¿Está seguro que desea eliminar este ${props.type}?`,
          onCancel: () => setIsDeleting(false),
          onConfirm: () => {
            alert("eliminado satisfactoriamente");
            setIsDeleting(false);
          },
        }}
      />
    </>
  );
};

interface CheckClienteProps {
  cliente: ICliente;
}

const CheckCliente = (props: CheckClienteProps): JSX.Element => {
  const { reserva, setReserva } = useReserva();

  const onChange = () => {
    setReserva(prev => ({
      ...prev,
      cliente: prev.cliente ? null : props.cliente,
    }));
  };

  return (
    <Checkbox
      disabled={
        !reserva.cliente ? false : reserva.cliente.id !== props.cliente.id
      }
      checked={
        !reserva.cliente ? false : reserva.cliente.id === props.cliente.id
      }
      onChange={onChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default Table;
