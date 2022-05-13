import React from "react";
import Stack from "@mui/material/Stack";
import { hardReservas } from "../data/index";
import { Box, TextField } from "@mui/material";
import IReserva from "../interfaces/Reserva";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const ConsultarReserva = () => {
  const [option, setOption] = React.useState<"reserva" | "cliente">("reserva");
  const valueRef = React.useRef<HTMLInputElement>(null);
  const [reserva, setReserva] = React.useState<IReserva | IReserva[]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valueRef.current?.value) return;
    const { value } = valueRef.current;

    option === "reserva" && setReserva(hardReservas[1]);
    option === "cliente" && setReserva(hardReservas);
    console.log({ value, option });
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography color="primary.main" variant="h4" component="h2">
        Consultar reserva
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={10}
        alignItems={{ xs: "center", sm: "flex-start" }}
      >
        <Stack
          // direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Consulta por:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={option}
              onChange={e => setOption(e.target.value as "reserva" | "cliente")}
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
        <Stack>
          {reserva && <pre>{JSON.stringify(reserva, null, 2)}</pre>}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ConsultarReserva;
