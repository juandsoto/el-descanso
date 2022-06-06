import React from "react";
import Stack from "@mui/material/Stack";
import { hardReservas, nombreServicios } from "../data/index";
import {
  Box,
  TextField,
  Divider,
  Button,
  Checkbox,
  FormGroup,
} from "@mui/material";
import IReserva from "../interfaces/Reserva";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { formatCurrency, isServiceAvailable } from "../utils";
import { useTheme } from "@mui/material/styles";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";

const ConsultarReserva = () => {
  const [option, setOption] = React.useState<"reserva" | "cliente">("reserva");
  const valueRef = React.useRef<HTMLInputElement>(null);
  // const [reserva, setReserva] = React.useState<IReserva | null>();
  const [reservas, setReservas] = React.useState<IReserva[] | null>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valueRef.current?.value) return;
    const { value } = valueRef.current;

    if (option === "reserva") {
      setReservas([hardReservas[1]]);
    }
    if (option === "cliente") {
      setReservas(hardReservas);
    }

    console.log({ value, option });
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
                    label="Número de reserva"
                  />
                  <FormControlLabel
                    value="cliente"
                    control={<Radio />}
                    label="Identificación de cliente"
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
          {/* {reserva?.cliente && (
            <RenderCliente>
              {Object.entries(reserva.cliente || {}).map(([key, value]) => {
                return (
                  <Box key={key}>
                    {key} - {value}
                  </Box>
                );
              })}
            </RenderCliente>
          )} */}
          {reservas && reservas[0].cliente && (
            <RenderCliente>
              {Object.entries(reservas[0].cliente || {}).map(([key, value]) => {
                return (
                  <Box key={key}>
                    {key} - {value}
                  </Box>
                );
              })}
            </RenderCliente>
          )}
        </Stack>
        <Stack>
          {/* {!reserva && !reservas && <DotLoader />} */}
          {/* {reserva && <RenderReservas reserva={reserva} />} */}
          {reservas &&
            reservas.map(reserva => (
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
        alignItems="center"
        justifyContent="center"
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
  const { reserva } = props;
  return (
    <Box pb={1}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems="center"
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
            <Typography component="span">
              {reserva.fecha_entrada.toLocaleDateString()} -{" "}
              {reserva.fecha_entrada.toLocaleTimeString()} -{" "}
              {reserva.numero_noches}{" "}
              {reserva.numero_noches === 1 ? "noche" : "noches"}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Stack alignItems="flex-start" justifyContent="center">
              {Object.entries(reserva.habitacion || {}).map(
                ([key, value]: [string, any]) => {
                  return (
                    <Typography key={key}>
                      {key} -{" "}
                      {key === "precio"
                        ? formatCurrency(value as number)
                        : value}
                    </Typography>
                  );
                }
              )}
            </Stack>
            <Stack justifyContent="space-around">
              {/* reserva.fecha_entrada.getTime() + 1000 * 60 * 60 >
                new Date().getTime() */}
              {reserva.habitacion.estado !== "ocupada" && (
                <>
                  <Button variant="outlined" color="primary">
                    Check-in
                  </Button>
                  {/* reserva.fecha_entrada.getTime() +
                1000 * 60 * 60 * 24 * reserva.numero_noches >
							new Date().getTime() */}
                  <Button variant="outlined" color="error">
                    Cancelar
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Box>

        <Stack>
          <Typography color="primary" variant="subtitle1" component="h5">
            Servicios Incluidos
          </Typography>
          <FormGroup>
            {nombreServicios.map(
              (servicio, index) =>
                isServiceAvailable(reserva.habitacion.tipo, servicio) && (
                  <FormControlLabel
                    sx={{ textTransform: "capitalize" }}
                    key={index}
                    control={
                      <Checkbox
                        size="small"
                        checked={false}
                        onChange={() => {}}
                      />
                    }
                    label={servicio}
                  />
                )
            )}
          </FormGroup>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ConsultarReserva;
