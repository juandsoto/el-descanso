import React from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Grid,
  SxProps,
  Divider,
} from "@mui/material";
import IFactura from "../interfaces/Factura";
import useFacturas from "../hooks/useFacturas";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { formatCurrency } from "../utils/index";
import SpeedDial from "./SpeedDial";
import moment from "moment";
import { motion, useAnimation } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummarizeIcon from "@mui/icons-material/Summarize";
import useServicios from "../hooks/useServicios";
import IServicioIncluido from "../interfaces/ServicioIncluido";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/auth/index";
import { isNull } from "lodash";

const Checkout = () => {
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { factura, loading, error, fetchFactura } = useFacturas();
  const [{ data: habitual }, fetchHabitual] = useAxios<{ descuento: number }>(
    {
      headers,
    },
    { manual: true }
  );
  const [serviciosIncluidos, setServiciosIncluidos] = React.useState<
    IServicioIncluido[]
  >([]);
  const {
    serviciosIncluidos: dataServiciosIncluidos,
    fetchServiciosIncluidos,
  } = useServicios();

  const onSearchFactura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef.current?.value.length) return;
    setServiciosIncluidos([]);
    fetchFactura(Number(searchRef.current.value));
    fetchServiciosIncluidos(Number(searchRef.current.value));
  };

  React.useEffect(() => {
    dataServiciosIncluidos && setServiciosIncluidos(dataServiciosIncluidos);
  }, [dataServiciosIncluidos]);

  React.useEffect(() => {
    if (!factura) return;
    fetchHabitual({
      url: `/clientehabitualfilter/?no_identificacion=${factura.reserva.cliente.no_identificacion}`,
    });
  }, [factura]);

  return (
    <Stack
      sx={{
        my: { xs: 2, md: 0 },
        mr: { xs: 0, md: "250px" },
        pr: { xs: 0, md: ".6rem" },
      }}
    >
      <Stack
        sx={{
          position: { xs: "static", md: "fixed" },
          top: "10px",
          bottom: "10px",
          right: "10px",
          boxShadow: "1px 0 10px rgba(0,0,0,0.7)",
          borderRadius: "20px",
          bgcolor: "background.default",
          width: { xs: "100%", md: "250px" },
          px: 1,
          py: 4,
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="h4" component="h2" color="secondary.main">
              Factura
            </Typography>
            <Typography textAlign="center">
              Busca una factura para ver su detalle
            </Typography>
          </Stack>
          <Stack
            component="form"
            alignItems="stretch"
            onSubmit={onSearchFactura}
            spacing={1}
          >
            <TextField label="Buscar..." inputRef={searchRef} size="small" />
            <Button type="submit" variant="outlined" color="primary">
              {loading ? (
                <CircularProgress size={25} color="primary" />
              ) : (
                "buscar"
              )}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Factura
          serviciosIncluidos={serviciosIncluidos}
          factura={factura ?? null}
          loading={loading}
          error={error}
          descuento={habitual?.descuento ?? 0}
          searchValue={searchRef?.current?.value}
        />
      </Stack>
    </Stack>
  );
};

interface FacturaProps {
  serviciosIncluidos: IServicioIncluido[];
  factura: IFactura | null;
  loading: boolean;
  error: any;
  descuento: number;
  searchValue: string | undefined;
}

const GridStyle = (order: number): SxProps => ({
  borderRadius: "20px",
  py: 1,
  px: 2,
  flex: 1,
  bgcolor: `grid.${order}`,
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(4.5px)",
  WebkitBackdropFilter: "blur(4.5px)",
  border: "1px solid rgba(123, 36, 36, 0.19)",
  flexDirection: "column",
  alignItems: "flex-start",
});
const ListItemStyle: SxProps = {
  p: 0,
};

const Factura = (props: FacturaProps) => {
  const {
    serviciosIncluidos,
    factura,
    loading,
    error,
    descuento,
    searchValue,
  } = props;

  const { checkout } = useFacturas();
  const { user } = useAuth();

  const total = React.useCallback(
    () =>
      serviciosIncluidos.reduce(
        (acc, c) => acc + c.servicio.precio,
        (factura?.reserva.numero_noches ?? 0) *
          (factura?.reserva.habitacion.tipo.precio ?? 0)
      ),
    [factura, serviciosIncluidos]
  );

  const controls = useAnimation();

  React.useEffect(() => {
    loading
      ? controls.start(i => ({
          opacity: 0,
          scale: 0,
        }))
      : controls.start(i => ({
          opacity: 1,
          scale: 1,
        }));
  }, [loading]);

  const isTimeout = React.useCallback(() => {
    if (!factura) return false;
    if (!isNull(factura.checkout)) return false;
    return (
      moment().diff(
        moment(factura?.reserva.fecha_entrada)
          .add(factura?.reserva.numero_noches, "days")
          .add(5, "hours"),
        "hours"
      ) >= 13
    );
  }, [factura]);
  return (
    <>
      <Stack sx={{ marginTop: 2 }}>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="h4"
            component="h2"
            color="secondary.main"
            sx={{ flex: 1 }}
          >
            {!factura
              ? "Busca una factura..."
              : loading
              ? "Cargando..."
              : `Factura #${searchValue || ""}`}
          </Typography>
          {factura?.checkout && !loading && (
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="caption">Fecha de salida</Typography>
              <Typography variant="body1">
                {moment(factura?.checkout.fecha_salida)
                  .add(5, "hours")
                  .format("DD-MM-YYYY, HH:mm a")}
              </Typography>
            </Stack>
          )}
          {!error &&
            !loading &&
            factura &&
            isNull(factura.checkout) &&
            user.rol !== "gerente" && (
              <SpeedDial
                actions={[
                  {
                    icon: <PictureAsPdfIcon />,
                    key: "Generar Factura",
                    onClick: () => {
                      console.log("Generar Factura");
                    },
                  },
                  {
                    icon: <CheckCircleIcon />,
                    key: "Checkout",
                    onClick: () => {
                      checkout(
                        factura.no_factura,
                        {
                          no_checkout: factura.no_factura,
                          cliente: factura.reserva.cliente.no_identificacion,
                        },
                        isTimeout,
                        factura.precio_total +
                          factura.reserva.habitacion.tipo.precio
                      );
                    },
                  },
                ]}
              />
            )}
        </Stack>
        {error ? (
          <Typography>No existe la factura</Typography>
        ) : (
          <>
            {isTimeout() && !loading && (
              <Typography textAlign="center" variant="h4" color="warning.main">
                Se aplicará cargo adicional por{" "}
                {formatCurrency(factura?.reserva.habitacion.tipo.precio ?? 0)}
              </Typography>
            )}
            <Stack mt={2} gap={2}>
              <Stack
                direction={{ xs: "column", sm: "row", md: "column", lg: "row" }}
                gap={2}
                flexWrap="wrap"
              >
                <Stack
                  component={motion.div}
                  custom={0}
                  animate={controls}
                  sx={{ ...GridStyle(1), flex: 2 }}
                >
                  <Stack alignItems="center" direction="row" width="100%">
                    <Typography sx={{ flex: 1 }}>Reserva</Typography>
                    <Box>
                      <AirplaneTicketIcon fontSize="large" />
                    </Box>
                  </Stack>
                  {!factura ? null : (
                    <List>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          No reserva #{factura.reserva.no_reserva}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Fecha de entrada:{" "}
                          {moment(factura.reserva.fecha_entrada)
                            .add(5, "hours")
                            .format("DD-MM-YYYY, HH:mm a")}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Noches: {factura?.reserva.numero_noches}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Fecha de salida estimada:{" "}
                          {moment(factura.reserva.fecha_entrada)
                            .add(5, "hours")
                            .add(factura.reserva.numero_noches, "days")
                            .format("DD-MM-YYYY, HH:mm a")}
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          ...ListItemStyle,
                          gap: 0.5,
                        }}
                      >
                        <span>Precio total:</span>
                        <ListItemText
                          sx={{
                            color: "text.primary",
                            textDecoration:
                              descuento !== 0 ? "line-through" : "none",
                          }}
                        >
                          {formatCurrency(total())}
                        </ListItemText>
                        {descuento !== 0 && (
                          <ListItemText>
                            (descuento: {descuento}%) ={" "}
                            {formatCurrency(factura.precio_total)}
                          </ListItemText>
                        )}
                      </ListItem>
                    </List>
                  )}
                </Stack>
                <Stack
                  component={motion.div}
                  custom={2}
                  animate={controls}
                  sx={{ ...GridStyle(2), flex: 1 }}
                >
                  <Stack alignItems="center" direction="row" width="100%">
                    <Typography sx={{ flex: 1 }}>
                      Servicios incluidos
                    </Typography>
                    <Box>
                      <SummarizeIcon fontSize="large" />
                    </Box>
                  </Stack>
                  {!serviciosIncluidos.length ? (
                    <Typography>
                      No hay servicios incluidos en la reserva
                    </Typography>
                  ) : (
                    <List sx={{ width: "100%" }}>
                      {serviciosIncluidos.map((s, index) => (
                        <div key={s.id}>
                          <ListItem
                            sx={{
                              ...ListItemStyle,
                              textTransform: "capitalize",
                              display: "flex",
                              flexDirection: {
                                xs: "row",
                                sm: "column",
                                md: "row",
                              },
                              justifyContent: "space-between",
                            }}
                          >
                            <Stack
                              direction={{
                                xs: "column",
                                sm: "row",
                                md: "column",
                              }}
                              justifyContent="space-around"
                              sx={{ flex: 1 }}
                              width="100%"
                            >
                              <Typography component="span">
                                {s.servicio.cod_servicio}
                              </Typography>
                              <Typography component="span">
                                {formatCurrency(s.servicio.precio)}
                              </Typography>
                            </Stack>
                            <ListItemText sx={{ textAlign: "right" }}>
                              {" "}
                              {moment(s.fecha_servicio).format(
                                "DD-MM-YYYY, hh:mm"
                              )}
                            </ListItemText>
                          </ListItem>
                          <Divider variant="fullWidth" sx={{ my: 0.5 }} />
                        </div>
                      ))}
                      <ListItem
                        sx={{
                          ...ListItemStyle,
                          textTransform: "capitalize",
                          display: "flex",
                          flexDirection: {
                            xs: "row",
                            sm: "column",
                            md: "row",
                          },
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItemText>Total:</ListItemText>
                        <ListItemText sx={{ textAlign: "right" }}>
                          {formatCurrency(
                            serviciosIncluidos.reduce(
                              (acc, c) => acc + c.servicio.precio,
                              0
                            )
                          )}
                        </ListItemText>
                      </ListItem>
                    </List>
                  )}
                </Stack>
              </Stack>
              <Stack direction="row" gap={2} flexWrap="wrap">
                <Stack
                  component={motion.div}
                  custom={3}
                  animate={controls}
                  sx={{ ...GridStyle(3), flexBasis: "300px" }}
                >
                  <Stack alignItems="center" direction="row" width="100%">
                    <Typography sx={{ flex: 1 }}>Cliente</Typography>
                    <Box>
                      <AccountCircleIcon fontSize="large" />
                    </Box>
                  </Stack>
                  {!factura ? null : (
                    <List>
                      <ListItem
                        sx={{ ...ListItemStyle, textTransform: "capitalize" }}
                      >
                        <ListItemText>
                          Nombre: {factura?.reserva.cliente.nombre}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Identificación:{" "}
                          {factura?.reserva.cliente.no_identificacion}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Correo: {factura?.reserva.cliente.correo}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Teléfono: {factura?.reserva.cliente.telefono}
                        </ListItemText>
                      </ListItem>
                    </List>
                  )}
                </Stack>
                <Stack
                  component={motion.div}
                  custom={4}
                  animate={controls}
                  sx={{
                    ...GridStyle(4),
                    flexBasis: "300px",
                  }}
                >
                  <Stack alignItems="center" direction="row" width="100%">
                    <Typography sx={{ flex: 1 }}>Habitación</Typography>
                    <Box>
                      <HotelIcon fontSize="large" />
                    </Box>
                  </Stack>
                  {!factura ? null : (
                    <List>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Habitacion #
                          {factura?.reserva.habitacion.no_habitacion}
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{ ...ListItemStyle, textTransform: "capitalize" }}
                      >
                        <ListItemText>
                          Tipo: {factura?.reserva.habitacion.tipo.tipo}
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ ...ListItemStyle }}>
                        <ListItemText>
                          Precio:{" "}
                          {formatCurrency(
                            factura?.reserva.habitacion.tipo.precio
                          )}
                        </ListItemText>
                      </ListItem>
                    </List>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
      {/* <Stack>
        <pre>{JSON.stringify(factura, null, 2)}</pre>
      </Stack> */}
    </>
  );
};

export default Checkout;
