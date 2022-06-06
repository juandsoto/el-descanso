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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Box,
} from "@mui/material";

import useFilter from "../hooks/useFilter";
import Filtro from "./Filtro";
import { useReserva } from "../context/reserva";
import { hardHabitaciones, nombreTipoHabitaciones } from "../data";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import AddIcon from "@mui/icons-material/Add";
import EditDrawer from "./EditDrawer";
import { useAuth } from "../context/auth/index";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { formatCurrency } from "../utils";
import ITipoHabitacion from "../interfaces/TipoHabitacion";
import useHabitaciones from "../hooks/useHabitaciones";

interface HabitacionesProps {}

const Habitaciones = (props: HabitacionesProps): JSX.Element => {
  const location = useLocation();
  const inAdminPanel = location.pathname.split("/")[2] === "administrador";

  const { filtro: filtroEstado, handleChange: handleChangeEstado } =
    useFilter<EstadoHabitacion>(inAdminPanel ? "todas" : "disponible");
  const { filtro: filtroTipo, handleChange: handleChangeTipo } =
    useFilter<NombreTipoHabitacion>("todas");
  const [nuevaHabitacion, setNuevaHabitacion] = React.useState<
    Exclude<NombreTipoHabitacion, "todas"> | ""
  >("");
  const theme = useTheme();
  const { user } = useAuth();
  const { habitaciones, createHabitacion } = useHabitaciones();

  const [deleting, setDeleting] = React.useState<IHabitacion | null>();

  const habitacionesFiltradas = React.useMemo(
    () =>
      habitaciones?.filter(habitacion => {
        const filtroPorEstado =
          habitacion.estado === filtroEstado || filtroEstado === "todas";
        const filtroPorTipo =
          habitacion.tipo.tipo === filtroTipo || filtroTipo === "todas";
        return filtroPorEstado && filtroPorTipo;
      }),
    [habitaciones, filtroEstado, filtroTipo]
  );

  const onNuevaHabitacion = (tipo: Exclude<NombreTipoHabitacion, "todas">) => {
    createHabitacion(tipo);
  };

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
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-start"
          spacing={4}
        >
          <Typography
            variant="h4"
            component="h2"
            color="primary.main"
            fontSize={{ xs: "1.5rem", sm: "2rem" }}
          >
            Habitaciones
          </Typography>
          {user.rol === "administrador" && (
            <FormControl sx={{ minWidth: 100 }} size="small">
              <InputLabel id="filter-select">Agregar</InputLabel>
              <Select
                labelId="filter-select"
                id="filter-select-id"
                value={nuevaHabitacion}
                onChange={e => onNuevaHabitacion(e.target.value as any)}
                autoWidth
                label="Agregar"
              >
                {nombreTipoHabitaciones.map(n => (
                  <MenuItem
                    key={n}
                    value={n}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="flex-end"
        >
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
        className="hide-scrollbar"
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
              {["no_habitacion", "tipo", "estado", "precio"].map(
                (column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {column}
                  </TableCell>
                )
              )}
              {!inAdminPanel && (
                <TableCell align="center">Seleccionar</TableCell>
              )}
              {inAdminPanel && <TableCell align="center">Eliminar</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody component={motion.tbody}>
            <AnimatePresence initial={false}>
              {!habitacionesFiltradas?.length ? (
                <TableRow
                  sx={{
                    // "&:last-child td, &:last-child th": { border: 0 },
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <TableCell
                    align="center"
                    colSpan={5}
                    sx={{ color: "error.main" }}
                  >
                    No existen habitaciones
                  </TableCell>
                </TableRow>
              ) : (
                habitacionesFiltradas.map(habitacion => {
                  return (
                    <TableRow
                      component={motion.tr}
                      layout
                      key={habitacion.no_habitacion}
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
                      <TableCell align="center">
                        {habitacion.no_habitacion}
                      </TableCell>
                      <TableCell align="center">
                        {habitacion.tipo.tipo}
                      </TableCell>
                      <TableCell align="center">{habitacion.estado}</TableCell>
                      <TableCell align="center">
                        {formatCurrency(habitacion.tipo.precio)}
                      </TableCell>
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
                })
              )}
            </AnimatePresence>
          </TableBody>
        </MuiTable>
      </TableContainer>
      {inAdminPanel && (
        <ConfirmDialog
          open={!!deleting}
          handleClose={() => setDeleting(null)}
          dialogInfo={{
            title: `Eliminar habitación no.${deleting?.no_habitacion}`,
            // item: deleting,
            description: `¿Está seguro que desea eliminar esta habitación?`,
            onCancel: () => setDeleting(null),
            onConfirm: () => {
              // setHabitaciones(prev =>
              //   prev.filter(
              //     habitacion =>
              //       habitacion.no_habitacion !== deleting!.no_habitacion
              //   )
              // );
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
