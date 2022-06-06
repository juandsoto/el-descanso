import React from "react";
import ISolicitud, { EstadoSolicitud } from "../interfaces/Solicitud";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";

import useFilter from "../hooks/useFilter";
import Filtro from "./Filtro";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";

const hardSolicitudes: ISolicitud[] = [
  {
    id: "1",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "2",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "3",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "4",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "5",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "6",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "7",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "8",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
  {
    id: "9",
    nombre: "juan",
    telefono: "123456789",
    correo: "juan@test.com",
    estado: "pendiente",
  },
];

const SOLICITUD: ISolicitud = {
  id: "",
  nombre: "",
  telefono: "",
  correo: "",
  estado: "",
};

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] =
    React.useState<ISolicitud[]>(hardSolicitudes);
  const theme = useTheme();

  const onSetSolicitud = (id: string) => {
    //TODO: enviar solicitud a backend
    const index = solicitudes.findIndex(solicitud => solicitud.id === id);
    setSolicitudes(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Stack alignItems="stretch">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography
          variant="h4"
          component="h2"
          color="primary.main"
          fontSize={{ xs: "1.5rem", sm: "2rem" }}
        >
          Solicitudes
        </Typography>
      </Stack>
      <TableContainer
        // className="hide-scrollbar_xs"
        className="hide-scrollbar"
        component={Paper}
        sx={{
          width: "100%",
          maxHeight: "250px",
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
              {Object.keys(SOLICITUD).map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {column}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                completar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence initial={false}>
              {!solicitudes.length ? (
                <TableRow
                  sx={{
                    // "&:last-child td, &:last-child th": { border: 0 },
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <TableCell
                    align="center"
                    colSpan={6}
                    sx={{ color: "error.main" }}
                  >
                    No existen solicitudes
                  </TableCell>
                </TableRow>
              ) : (
                solicitudes.map(solicitud => (
                  <TableRow
                    component={motion.tr}
                    layout
                    key={solicitud.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                    exit={{ opacity: 0 }}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <Solicitud solicitud={solicitud} />
                    {solicitud.estado === "pendiente" && (
                      <TableCell align="center">
                        <CheckIcon
                          fontSize="medium"
                          htmlColor={theme.palette.primary.main}
                          onClick={() => onSetSolicitud(solicitud.id)}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
};

interface SolicitudProps {
  solicitud: ISolicitud;
}

const Solicitud = (props: SolicitudProps): JSX.Element => {
  return (
    <>
      {Object.values(props.solicitud).map((cell: string, index) => (
        <TableCell align="center" key={index}>
          {cell}
        </TableCell>
      ))}
    </>
  );
};

export default Solicitudes;
