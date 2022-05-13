import React from "react";
import IHabitacion, { EstadoHabitacion } from "../interfaces/Habitacion";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";
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
  Checkbox,
} from "@mui/material";

import useFilter from "../hooks/useFilter";
import Filtro from "./Filtro";
import { useReserva } from "../context/reserva";
import { hardHabitaciones } from "../data";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

interface HabitacionesProps {}

const Habitaciones = (props: HabitacionesProps): JSX.Element => {
  const { filtro: filtroEstado, handleChange: handleChangeEstado } =
    useFilter<EstadoHabitacion>("disponible");
  const { filtro: filtroTipo, handleChange: handleChangeTipo } =
    useFilter<NombreTipoHabitacion>("todas");
  const theme = useTheme();

  const [habitaciones, setHabitaciones] =
    React.useState<IHabitacion[]>(hardHabitaciones);

  const [deleting, setDeleting] = React.useState<IHabitacion | null>();

  const location = useLocation();

  const inAdminPanel = location.pathname.split("/")[2] === "administrador";

  const habitacionesFiltradas = React.useMemo(
    () =>
      habitaciones.filter(habitacion => {
        const filtroPorEstado =
          habitacion.estado === filtroEstado || filtroEstado === "todas";
        const filtroPorTipo =
          habitacion.tipo === filtroTipo || filtroTipo === "todas";
        return filtroPorEstado && filtroPorTipo;
      }),
    [habitaciones, filtroEstado, filtroTipo]
  );

  return (
    <Stack
      height="100%"
      alignItems="stretch"
      justifyContent="start"
      spacing={2}
    >
      <Stack
        mt={1}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography
          variant="h4"
          component="h2"
          color="primary.main"
          fontSize={{ xs: "1.5rem", sm: "2rem" }}
        >
          Habitaciones
        </Typography>
        <Stack direction="row" spacing={1}>
          <Filtro
            {...{
              filtro: filtroTipo,
              handleChange: handleChangeTipo,
              nombre: "tipo",
              opciones: [
                "sencilla",
                "doble",
                "matrimonial",
                "suite sencilla",
                "suite presidencial",
                "todas",
              ],
            }}
          />
          <Filtro
            {...{
              filtro: filtroEstado,
              handleChange: handleChangeEstado,
              nombre: "estado",
              opciones: ["disponible", "reservada", "ocupada", "todas"],
            }}
          />
        </Stack>
      </Stack>
      <TableContainer
        className="hide-scrollbar_xs"
        component={Paper}
        sx={{
          width: "100%",
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
              {Object.keys(habitaciones[0]).map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {column}
                </TableCell>
              ))}
              {!inAdminPanel && (
                <TableCell align="center">Seleccionar</TableCell>
              )}
              {inAdminPanel && <TableCell align="center">Eliminar</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {habitacionesFiltradas.map((habitacion, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {Object.values(habitacion).map((cell: string, index) => {
                    return (
                      <TableCell align="center" key={index}>
                        {cell}
                      </TableCell>
                    );
                  })}
                  {!inAdminPanel && (
                    <TableCell align="center">
                      <CheckHabitacion habitacion={habitacion} />
                    </TableCell>
                  )}
                  {inAdminPanel && (
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleting(habitacion)}
                      >
                        eliminar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {inAdminPanel && (
        <ConfirmDialog
          open={!!deleting}
          handleClose={() => setDeleting(null)}
          dialogInfo={{
            title: `Eliminar habitación no.${deleting?.no_habitacion}`,
            description: `¿Está seguro que desea eliminar esta habitación?`,
            onCancel: () => setDeleting(null),
            onConfirm: () => {
              setHabitaciones(prev =>
                prev.filter(
                  habitacion =>
                    habitacion.no_habitacion !== deleting!.no_habitacion
                )
              );
              setDeleting(null);
            },
          }}
        />
      )}
    </Stack>
  );
};

interface CheckHabitacionProps {
  habitacion: IHabitacion;
}

const CheckHabitacion = (props: CheckHabitacionProps): JSX.Element => {
  const { reserva, setReserva } = useReserva();

  const onCheck = () => {
    setReserva(prev => {
      const habitaciones = prev.habitaciones.some(
        h => h.no_habitacion === props.habitacion.no_habitacion
      )
        ? prev.habitaciones.filter(
            h => h.no_habitacion !== props.habitacion.no_habitacion
          )
        : [...prev.habitaciones, props.habitacion];

      return { ...prev, habitaciones };
    });
  };

  return (
    <Checkbox
      disabled={props.habitacion.estado !== "disponible"}
      checked={reserva.habitaciones.some(
        h => h.no_habitacion === props.habitacion.no_habitacion
      )}
      onChange={onCheck}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default Habitaciones;
