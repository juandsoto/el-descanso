import {
  Box,
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Stack,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IUsuario from "../interfaces/Usuario";
import React from "react";
import EditDrawer from "./EditDrawer";
import ConfirmDialog from "./ConfirmDialog";
import { useTheme } from "@mui/material/styles";
import ICliente from "../interfaces/Cliente";
import { useReserva } from "../context/reserva/index";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface TableProps<T> {
  title: string;
  rows: Omit<T, "password">[];
  type: "usuario" | "cliente";
  fullWidth?: boolean;
  initialSelected: Omit<T, "password">;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: (item: T) => void;
  onUpdate: (item: T) => void;
  onDelete: (id: string) => void;
}

const CLIENTE: ICliente = {
  no_identificacion: "",
  nombre: "",
  telefono: "",
  correo: "",
};

const USUARIO: Omit<IUsuario, "password"> = {
  id: "",
  rol: "",
  nombre: "",
  username: "",
  telefono: "",
};

const Table = <T extends Partial<Omit<IUsuario, "password"> & ICliente>>(
  props: TableProps<T>
): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Omit<T, "password">>(
    props.initialSelected
  );
  const theme = useTheme();
  const location = useLocation();

  console.log("render table");

  const inAdminPanel = location.pathname.split("/")[2] === "administrador";

  let SUBJECT: ICliente | Omit<IUsuario, "password"> =
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={{ xs: 1, sm: 4 }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="primary.main"
              fontSize={{ xs: "1.5rem", sm: "2rem" }}
            >
              {props.title}
            </Typography>
            <Button
              onClick={() => {
                setIsCreating(true);
              }}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Stack>
          <TextField
            id="standard-basic"
            label="Buscar..."
            variant="standard"
            onChange={props.onChangeSearch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <TableContainer
          className="hide-scrollbar"
          sx={{
            width: `${props.fullWidth ? "100%" : "80%"}`,
            height: "400px",
            boxShadow: `2px 2px 7px ${theme.palette.grey[900]}`,
          }}
        >
          <MuiTable
            stickyHeader
            sx={{
              minWidth: 650,
              bgcolor: "background.default",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {Object.keys(SUBJECT).map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                    colSpan={index === 2 ? 2 : 1}
                  >
                    {column}
                  </TableCell>
                ))}
                {!inAdminPanel && (
                  <TableCell align="center">Seleccionar</TableCell>
                )}
                {inAdminPanel && (
                  <>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence initial={false}>
                {!props.rows.length ? (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <TableCell
                      align="center"
                      colSpan={8}
                      sx={{ color: "error.main" }}
                    >
                      No existen {props.type}s
                    </TableCell>
                  </TableRow>
                ) : (
                  props.rows.map((row, index) => {
                    return (
                      <TableRow
                        key={`${props.type} ${index}`}
                        component={motion.tr}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        exit={{ opacity: 0 }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {Object.values(row).map((value: any, index) => {
                          return (
                            <TableCell
                              align="center"
                              key={index}
                              colSpan={index === 2 ? 2 : 1}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                        {!inAdminPanel && (
                          <TableCell align="center">
                            <CheckCliente cliente={row as ICliente} />
                          </TableCell>
                        )}
                        {inAdminPanel && (
                          <>
                            <TableCell align="center">
                              <Button
                                variant="text"
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
                                variant="text"
                                color="error"
                                onClick={() => {
                                  setSelected(row);
                                  setIsDeleting(true);
                                }}
                              >
                                eliminar
                              </Button>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </AnimatePresence>
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
      <EditDrawer
        handleClose={() => setIsCreating(false)}
        open={isCreating}
        editing={(props.type === "usuario" ? USUARIO : CLIENTE) as T}
        type={props.type}
        creating
        onConfirm={(row: T) => {
          setIsCreating(false);
          props.onCreate(row);
        }}
      />
      {inAdminPanel && (
        <>
          <EditDrawer
            handleClose={() => setIsEditing(false)}
            open={isEditing}
            editing={selected}
            type={props.type}
            onConfirm={(row: T) => {
              setIsEditing(false);
              props.onUpdate(row);
            }}
          />
          <ConfirmDialog
            open={isDeleting}
            handleClose={() => setIsDeleting(false)}
            dialogInfo={{
              title: `Eliminar ${props.type}`,
              description: `¿Está seguro que desea eliminar este ${props.type}?`,
              onCancel: () => setIsDeleting(false),
              onConfirm: () => {
                setIsDeleting(false);
                props.onDelete(selected.id ?? "");
              },
            }}
          />
        </>
      )}
    </>
  );
};

interface CheckClienteProps {
  cliente: ICliente;
}

const CheckCliente = (props: CheckClienteProps): JSX.Element => {
  const { reserva, setReserva } = useReserva();
  const [checked, setChecked] = React.useState<boolean>(false);

  const onChange = () => {
    setChecked(prev => !prev);
    setReserva(prev => ({
      ...prev,
      cliente: prev.cliente ? null : props.cliente,
    }));
  };

  return (
    <Checkbox
      disabled={
        !reserva.cliente
          ? false
          : reserva.cliente.no_identificacion !==
            props.cliente.no_identificacion
      }
      checked={
        !reserva.cliente
          ? false
          : reserva.cliente.no_identificacion ===
              props.cliente.no_identificacion || checked
      }
      onChange={onChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default Table;
