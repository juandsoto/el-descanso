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
    estado: "atendida",
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
    estado: "atendida",
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
    estado: "atendida",
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

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] =
    React.useState<ISolicitud[]>(hardSolicitudes);
  const { filtro, handleChange } = useFilter<EstadoSolicitud>("pendiente");
  const theme = useTheme();

  const solicitudesFiltradas = React.useMemo(() => {
    return solicitudes.filter(
      solicitud => solicitud.estado === filtro || filtro === "todas"
    );
  }, [filtro, solicitudes]);

  const onSetSolicitud = (id: string) => {
    //TODO: enviar solicitud a backend
    const index = solicitudes.findIndex(solicitud => solicitud.id === id);
    setSolicitudes(prev => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          estado: "atendida",
        },
        ...prev.slice(index + 1),
      ] as ISolicitud[];
    });
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
        <Filtro
          {...{
            filtro,
            handleChange,
            nombre: "estado",
            opciones: ["pendiente", "atendida", "todas"],
          }}
        />
      </Stack>
      <TableContainer
        className="hide-scrollbar_xs"
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
              {Object.keys(solicitudes[0]).map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {column}
                </TableCell>
              ))}
              {filtro !== "atendida" && (
                <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                  completar
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudesFiltradas.map((solicitud, index) => (
              <TableRow
                key={index}
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
            ))}
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
