import React from "react";
import {
  Stack,
  Box,
  TextField,
  Divider,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import { motion } from "framer-motion";
import IReserva from "../interfaces/Reserva";
import { nombreServicios } from "../data/index";
import { formatCurrency, isServiceAvailable } from "../utils";
import { useTheme } from "@mui/material/styles";
import useReservas from "../hooks/useReservas";
import useFacturas from "../hooks/useFacturas";
import useHabitaciones from "../hooks/useHabitaciones";
import useServicios from "../hooks/useServicios";
import { CodServicio } from "../interfaces/Servicio";
import IServicioIncluido from "../interfaces/ServicioIncluido";
import IServicio from "../interfaces/Servicio";
import { useAuth } from "../context/auth/index";

const ConsultarReserva = () => {
  const [option, setOption] = React.useState<"reserva" | "cliente">("reserva");
  const valueRef = React.useRef<HTMLInputElement>(null);
  const {
    reservas,
    loading,
    reservasByIdError,
    reservasByClientIdError,
    getReservasById,
    getReservasByClientId,
  } = useReservas();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valueRef.current?.value) return;
    const { value } = valueRef.current;

    if (option === "reserva") {
      getReservasById(Number(value));
    }
    if (option === "cliente") {
      getReservasByClientId(value);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" p={4}>
      <Typography
        alignSelf={{ xs: "center", lg: "auto" }}
        color="primary.main"
        variant="h4"
        component="h2"
      >
        Consultar reserva
      </Typography>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="center"
        spacing={4}
        width="100%"
        alignItems={{ xs: "center", lg: "flex-start" }}
      >
        <Stack
          spacing={4}
          direction={{ xs: "column", sm: "row", lg: "column" }}
          alignItems="center"
        >
          <motion.div layout transition={{ ease: "easeInOut", duration: 0.5 }}>
            <Stack alignItems="flex-start" justifyContent="flex-start">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Consulta por:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={option}
                  onChange={e =>
                    setOption(e.target.value as "reserva" | "cliente")
                  }
                >
                  <FormControlLabel
                    value="reserva"
                    control={<Radio />}
                    label="N??mero de reserva"
                  />
                  <FormControlLabel
                    value="cliente"
                    control={<Radio />}
                    label="Identificaci??n de cliente"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  disabled={!option}
                  label="Buscar..."
                  id="outlined-size-small"
                  inputRef={valueRef}
                />
              </Box>
            </Stack>
          </motion.div>
          {loading && <CircularProgress color="primary" />}
          {reservasByIdError?.code === "ERR_BAD_REQUEST" && (
            <Typography color="error.main" variant="h6">
              Reserva #{valueRef?.current?.value} no existe
            </Typography>
          )}
          {reservasByClientIdError?.code === "ERR_BAD_REQUEST" && (
            <Typography color="error.main" variant="h6">
              Cliente con identificaci??n {valueRef?.current?.value} no registra
              reservas
            </Typography>
          )}
          {reservas && reservas[0]?.cliente && (
            <RenderCliente>
              {Object.entries(reservas[0].cliente || {}).map(([key, value]) => {
                return (
                  <Box key={key}>
                    {key.toUpperCase()}: {value}
                  </Box>
                );
              })}
            </RenderCliente>
          )}
        </Stack>
        <Stack
          className="hide-scrollbar"
          sx={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {reservas &&
            reservas
              .sort(
                (a, b) =>
                  // @ts-ignore
                  moment(b.fecha_entrada).add(b.numero_noches, "days") -
                  // @ts-ignore
                  moment(a.fecha_entrada).add(a.numero_noches, "days")
              )
              .map(reserva => (
                <RenderReservas key={reserva.no_reserva} reserva={reserva} />
              ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

interface RenderClienteProps {
  children: JSX.Element | JSX.Element[];
}

const RenderCliente = ({ children }: RenderClienteProps) => {
  const theme = useTheme();
  return (
    <Stack alignItems="center" spacing={1}>
      <Typography variant="h5" component="h5" color="primary">
        Cliente
      </Typography>
      <Stack
        spacing={0.5}
        sx={{
          boxShadow: `inset 0px -2px 5px ${theme.palette.grey[900]}`,
          borderRadius: "20px",
          padding: 2,
        }}
        alignItems="flex-start"
      >
        {children}
      </Stack>
    </Stack>
  );
};

interface RenderReservasProps {
  reserva: IReserva;
}

const RenderReservas = (props: RenderReservasProps) => {
  const [reserva, setReserva] = React.useState<IReserva>(props.reserva);
  const [servicios_incluidos, setServicios_incluidos] = React.useState<
    IServicio[]
  >([]);
  const { user } = useAuth();
  const { fecha_entrada } = reserva;
  const fecha_salida = moment(fecha_entrada)
    .add(5, "hours")
    .add(reserva.numero_noches, "days");
  const { cancelarReserva } = useReservas();
  const { createFactura } = useFacturas();
  const { cambiarEstadoHabitacion } = useHabitaciones();
  const {
    serviciosIncluidos,
    serviciosIncluidosLoading,
    fetchServiciosIncluidos,
    postResponse,
  } = useServicios();
  const inProgress =
    moment().isBetween(
      moment(fecha_entrada).subtract(12, "hours"),
      moment(fecha_salida).add(12, "hours")
    ) && reserva.habitacion.estado === "ocupada";
  const isCancelada = reserva.cancelada;
  const isCompleted = moment(fecha_salida).isBefore(moment());
  const showCheckin =
    moment().isBetween(
      moment(fecha_entrada).subtract(12, "hours"),
      moment(fecha_salida).add(12, "hours")
    ) &&
    reserva.habitacion.estado !== "ocupada" &&
    !isCancelada;

  const showServiciosIncluidos = (inProgress || isCompleted) && !isCancelada;

  const cancelar = () => {
    cancelarReserva(reserva.no_reserva);
    setReserva(prev => ({ ...prev, cancelada: true }));
    cambiarEstadoHabitacion(reserva.habitacion.no_habitacion, "disponible");
  };

  const checkin = (precioTotal: number) => {
    setReserva(prev => ({
      ...prev,
      habitacion: { ...prev.habitacion, estado: "ocupada" },
    }));
    createFactura({
      no_factura: reserva.no_reserva,
      reserva: reserva.no_reserva,
      precio_total: precioTotal,
    });
    cambiarEstadoHabitacion(reserva.habitacion.no_habitacion, "ocupada");
  };

  const getEstado = (): {
    color: string;
    estado: "cancelada" | "en progreso" | "completada" | "pendiente";
  } => {
    if (isCompleted)
      return {
        color: "primary.main",
        estado: "completada",
      };
    if (isCancelada)
      return {
        color: "error.main",
        estado: "cancelada",
      };
    if (inProgress)
      return {
        color: "secondary.main",
        estado: "en progreso",
      };
    return {
      color: "warning.main",
      estado: "pendiente",
    };
  };

  React.useEffect(() => {
    if (!serviciosIncluidos?.length) return;
    setServicios_incluidos(serviciosIncluidos.map(s => s.servicio));
  }, [serviciosIncluidos]);

  // React.useEffect(() => {
  //   if (!postResponse) return;
  //   console.log("postresponse");
  //   setServicios_incluidos(prev => [
  //     ...prev,
  //     postResponse.servicio_incluido.servicio,
  //   ]);
  // }, [postResponse]);

  React.useEffect(() => {
    fetchServiciosIncluidos(reserva.no_reserva);
  }, []);

  const getTotal = React.useMemo(() => {
    return (
      servicios_incluidos.reduce((acc, s) => acc + s.precio, 0) +
      reserva.habitacion.tipo.precio * reserva.numero_noches
    );
  }, [servicios_incluidos]);

  return (
    <Box pb={1}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
          >
            <Typography color="primary" variant="h6" component="h4">
              Reserva #{reserva.no_reserva}
            </Typography>
            <Typography
              component="span"
              sx={{
                color:
                  moment().isAfter(
                    moment(reserva.fecha_entrada).add(5, "hours")
                  ) &&
                  !isCompleted &&
                  !inProgress &&
                  !isCancelada
                    ? "error.main"
                    : "auto",
              }}
            >
              {moment(reserva.fecha_entrada)
                .add(5, "hours")
                .format("DD/MM/YYYY, HH:mm a")}
            </Typography>
            <Typography component="span">
              {reserva.numero_noches}{" "}
              {reserva.numero_noches === 1 ? "noche" : "noches"}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Stack
              alignItems="flex-start"
              justifyContent="center"
              textTransform="capitalize"
            >
              {Object.entries(reserva.habitacion || {}).map(
                ([key, value]: [string, any]) => {
                  if (key === "tipo")
                    return Object.entries(value).map(
                      ([tKey, tValue]: [string, any]) =>
                        tKey !== "descripcion" && (
                          <Typography key={tKey}>
                            {tKey}:{" "}
                            {tKey === "precio"
                              ? formatCurrency(getTotal)
                              : tValue}
                          </Typography>
                        )
                    );
                  if (key === "estado") return null;
                  return (
                    <Typography key={key}>
                      {key}: {value}
                    </Typography>
                  );
                }
              )}
              <Typography color={getEstado().color}>
                estado: {getEstado().estado}
              </Typography>
            </Stack>
            <Stack justifyContent="space-around">
              {showCheckin && user.rol !== "gerente" && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() =>
                    checkin(
                      reserva.habitacion.tipo.precio * reserva.numero_noches
                    )
                  }
                >
                  Check-in
                </Button>
              )}
              {getEstado().estado === "pendiente" && user.rol !== "gerente" && (
                <Button variant="text" color="error" onClick={cancelar}>
                  Cancelar
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
        {showServiciosIncluidos && (user.rol !== "gerente" || isCompleted) && (
          <Stack>
            <Typography color="primary" variant="subtitle1" component="h5">
              Servicios Incluidos
            </Typography>
            {serviciosIncluidosLoading ? (
              <CircularProgress color="primary" size={25} />
            ) : (
              <FormGroup>
                {nombreServicios.map(
                  (servicio, index) =>
                    isServiceAvailable(
                      reserva.habitacion.tipo.tipo,
                      servicio
                    ) && (
                      <CheckServicio
                        key={index}
                        cod_servicio={servicio}
                        no_factura={reserva.no_reserva}
                        servicios_incluidos={servicios_incluidos ?? []}
                        setServicios_incluidos={setServicios_incluidos}
                        disabled={isCompleted}
                      />
                    )
                )}
              </FormGroup>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

interface CheckServicioProps {
  cod_servicio: CodServicio;
  no_factura: number;
  servicios_incluidos: IServicio[];
  setServicios_incluidos: React.Dispatch<React.SetStateAction<IServicio[]>>;
  disabled: boolean;
}

const CheckServicio = (props: CheckServicioProps) => {
  const {
    cod_servicio,
    no_factura,
    servicios_incluidos,
    disabled,
    setServicios_incluidos,
  } = props;
  const [checked, setChecked] = React.useState<boolean>(false);
  const { createServicioIncluido } = useServicios();

  const onCheck = () => {
    if (checked) return;
    createServicioIncluido(no_factura, cod_servicio);
    setChecked(true);
  };

  React.useEffect(() => {
    if (!servicios_incluidos.length) return;
    setChecked(
      servicios_incluidos.map(s => s.cod_servicio).includes(cod_servicio)
    );
  }, [servicios_incluidos]);

  return (
    <FormControlLabel
      sx={{ textTransform: "capitalize" }}
      control={
        <Checkbox
          size="small"
          disabled={disabled || checked}
          checked={checked}
          onChange={onCheck}
        />
      }
      label={props.cod_servicio}
    />
  );
};

export default ConsultarReserva;
