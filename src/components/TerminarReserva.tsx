import React from "react";
import { Box, Typography, Divider, TextField, Avatar } from "@mui/material";
import { additionalReserva, useReserva } from "../context/reserva/index";
import IReserva from "../interfaces/Reserva";
import IHabitacion from "../interfaces/Habitacion";
import Stack from "@mui/material/Stack";
import { formatCurrency } from "../utils";
import { useTheme } from "@mui/material/styles";

const TerminarReserva = () => {
  const { reserva } = useReserva();
  const theme = useTheme();
  const [reservaCompleta, setReservaCompleta] = React.useState<IReserva>();

  const precioTotal = React.useCallback<() => number>(
    () =>
      reserva.habitaciones.reduce((acc, habitacion) => {
        const { precio, numero_noches } = habitacion!;
        const value: number =
          !!precio && !!numero_noches ? precio * numero_noches : 0;
        return acc + value;
      }, 0),
    [reserva]
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h3" color="primary.main">
        Terminar reserva
      </Typography>
      <Divider variant="fullWidth" />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-around"
        alignItems={{ xs: "stretch", lg: "flex-start" }}
        spacing={2}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          direction={{ xs: "column", sm: "row", lg: "column" }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {reserva.cliente?.nombre[0].toUpperCase() || "-"}
          </Avatar>
          <Stack
            alignItems="center"
            spacing={1}
            sx={{
              boxShadow: `inset 0px -2px 5px ${theme.palette.grey[900]}`,
              borderRadius: "20px",
              padding: 2,
            }}
          >
            {Object.entries(reserva.cliente || {}).map(([key, value]) => {
              return (
                <Box key={key}>
                  {key} - {value}
                </Box>
              );
            })}
          </Stack>
        </Stack>
        <Stack>
          <Stack
            className="hide-scrollbar"
            sx={{
              maxHeight: "300px",
              overflowY: "scroll",
              boxShadow: `inset 0px -2px 5px ${theme.palette.grey[900]}`,
              borderRadius: "20px",
              padding: 2,
            }}
          >
            <Typography
              textAlign={{ xs: "center", sm: "left" }}
              variant="h6"
              component="h4"
              color="primary.main"
            >
              Habitaciones
            </Typography>
            {reserva.habitaciones.map((habitacion, index) => (
              <HabitacionIndividual key={index} habitacion={habitacion} />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Typography
              variant="subtitle1"
              component="span"
              color="primary.main"
            >
              Total - {formatCurrency(precioTotal())}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

interface HabitacionIndividualProps {
  habitacion: IHabitacion & additionalReserva;
}

const HabitacionIndividual = (props: HabitacionIndividualProps) => {
  const { setReserva } = useReserva();

  React.useEffect(
    () => console.log(typeof props.habitacion.fecha_entrada),
    [props.habitacion.fecha_entrada]
  );

  React.useEffect(() => {
    if (!!props.habitacion.numero_noches) return;

    //@ts-ignore
    setReserva(prev => {
      const index: number = prev.habitaciones.findIndex(
        h => h.no_habitacion === props.habitacion.no_habitacion
      );
      return {
        ...prev,
        habitaciones: [
          ...prev.habitaciones.slice(0, index),
          {
            ...prev.habitaciones[index],
            numero_noches: 1,
          },
          ...prev.habitaciones.slice(index + 1),
        ],
      };
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReserva(prev => {
      const index: number = prev.habitaciones.findIndex(
        h => h.no_habitacion === props.habitacion.no_habitacion
      );
      return {
        ...prev,
        habitaciones: [
          ...prev.habitaciones.slice(0, index),
          {
            ...prev.habitaciones[index],
            [name]:
              name === "numero_noches" ? Math.max(1, Number(value!)) : value,
          },
          ...prev.habitaciones.slice(index + 1),
        ],
      };
    });
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems="center"
      >
        <Typography component="span" textTransform="capitalize" flex={1}>
          {`no: ${props.habitacion.no_habitacion} - ${
            props.habitacion.tipo
          } - ${formatCurrency(props.habitacion.precio || 0)}`}
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{ width: { xs: "12rem", sm: "14.2rem" } }}
            size="small"
            label="fecha de entrada"
            InputLabelProps={{
              shrink: true,
            }}
            name="fecha_entrada"
            value={props.habitacion.fecha_entrada ?? ""}
            onChange={onChange}
            type="datetime-local"
          />
          <TextField
            sx={{ width: "5rem" }}
            size="small"
            label="#noches"
            name="numero_noches"
            value={props.habitacion.numero_noches ?? 1}
            onChange={onChange}
            type="number"
          />
        </Stack>
      </Stack>
      <Divider variant="fullWidth" sx={{ marginY: 0.5 }} />
    </>
  );
};

export default TerminarReserva;