import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { UserLayout, UserLayoutLeft, UserLayoutRight } from "../components";
import Informe from "../components/Informe";
import { TiposDeHabitacion, ReservasPorCliente } from "../informes";
import ICliente from "../interfaces/Cliente";
import { hardReservas } from "../data/index";
import IReserva from "../interfaces/Reserva";
import toast from "react-hot-toast";
import OcupacionHotelChart from "../components/OcupacionHotelChart";
import UsoDeServiciosChart from "../components/UsoDeServiciosChart";
import CancelacionDeReservas from "../components/CancelacionDeReservas";
import VentasPorServicioChart from "../components/VentasPorServicioChart";
const Gerente = (): JSX.Element => {
  return (
    <UserLayout>
      <UserLayoutLeft />
      <UserLayoutRight username="Gerente">
        <Stack mr={{ xs: 0, lg: "310px" }} mb={2}>
          <Stack position="relative">
            <OcupacionHotelChart />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <Box width={{ xs: "100%", sm: "80%", md: "60%" }}>
              <UsoDeServiciosChart />
            </Box>
            <CancelacionDeReservas />
          </Stack>
          <Stack position="relative">
            <VentasPorServicioChart />
          </Stack>
        </Stack>
        <Box
          sx={{
            position: { xs: "flex", lg: "fixed" },
            top: "10px",
            bottom: "10px",
            right: "10px",
            width: { xs: "100%", lg: "300px" },
            boxShadow: "1px 0 10px rgba(0,0,0,0.2)",
            borderRadius: "20px",
            bgcolor: "background.default",
          }}
        >
          <Stack
            height="100%"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              variant="h5"
              component="h4"
              sx={{
                bgcolor: "secondary.main",
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                p: 2,
                textAlign: "center",
              }}
            >
              Informes
            </Typography>
            <Stack
              width="100%"
              direction={{ xs: "column", sm: "row", lg: "column" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
              sx={{ flex: 1, p: 1 }}
            >
              <ExportTiposDeHabitaciones />
              <ExportReservasPorCliente />
            </Stack>
          </Stack>
        </Box>
      </UserLayoutRight>
    </UserLayout>
  );
};

const ExportReservasPorCliente = () => {
  const [id, setId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [reservas, setReservas] = React.useState<IReserva[]>([] as IReserva[]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => response.json())
      .then(data => {
        if (!!data.id) {
          setLoading(false);
          setReservas(hardReservas);
          return;
        }
        console.log("no");
        setLoading(false);
        setReservas([]);
        toast.error(`No se encontró el cliente con identificación ${id}`, {
          duration: 3500,
        });
      });
  };

  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <Typography variant="h6" component="h4">
        Reservas del cliente
      </Typography>
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
        direction="row"
        alignItems="stretch"
      >
        <TextField
          label="Identificación del cliente"
          size="small"
          name="id"
          value={id}
          onChange={e => setId(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button variant="outlined" color="primary" type="submit">
          {!loading ? (
            "Buscar..."
          ) : (
            <CircularProgress color="primary" size={25} />
          )}
        </Button>
      </Stack>
      <Button fullWidth disabled={!reservas.length} variant="contained">
        {!!reservas.length && (
          <PDFDownloadLink
            style={{
              width: "100%",
              textDecoration: "none",
              color: "black",
            }}
            fileName={`reservas_cliente_${id}`}
            document={
              <Informe
                data={{
                  title: "Reservas del cliente",
                }}
              >
                <ReservasPorCliente reservas={reservas} />
              </Informe>
            }
          >
            Descargar
          </PDFDownloadLink>
        )}
        {!reservas.length && "Descargar"}
      </Button>
    </Stack>
  );
};

const ExportTiposDeHabitaciones = () => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <Typography variant="h6" component="h4">
        Tipos de habitación
      </Typography>
      <PDFDownloadLink
        fileName="tipos_de_habitaciones"
        document={
          <Informe
            data={{
              title: "Tipos de habitacion",
            }}
          >
            <TiposDeHabitacion />
          </Informe>
        }
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained">Descargar</Button>
      </PDFDownloadLink>
    </Stack>
  );
};

export default Gerente;
