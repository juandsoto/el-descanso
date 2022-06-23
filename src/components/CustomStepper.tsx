import React from "react";
import {
  Stack,
  StepLabel,
  Avatar,
  Box,
  Divider,
  Stepper,
  Step,
  Button,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Clientes from "./Clientes";
import TerminarReserva from "./TerminarReserva";
import { Reserva, useReserva } from "../context/reserva/index";
import IReservaBody from "../interfaces/api/ReservaBody";
import Habitaciones from "./Habitaciones";
import CircularProgress from "@mui/material/CircularProgress";
import useReservas from "../hooks/useReservas";
import { ReservaResponse } from "../interfaces/api/ReservaPostResponse";
import useHabitaciones from "../hooks/useHabitaciones";
import moment from "moment";
import ICliente from "../interfaces/Cliente";
import { styled, useTheme } from "@mui/material/styles";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(5, 255, 242) 0%, rgba(12,176,169,1) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(5, 255, 242) 0%, rgba(12,176,169,1) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(5, 255, 242) 20%, rgba(12,176,169,1) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(5, 255, 242) 20%, rgba(12,176,169,1) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountCircleOutlinedIcon fontSize="large" />,
    2: <BedOutlinedIcon fontSize="large" />,
    3: <VideoLabelIcon fontSize="large" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const steps = [
  "Selecciona un cliente",
  "Selecciona las habitaciones",
  "Datos adicionales",
];

const CustomStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();

  const { reserva, reset } = useReserva();
  const {
    postReservas,
    createReservas,
    reset: resetPostReservas,
  } = useReservas();

  const { cambiarEstadosHabitaciones } = useHabitaciones();

  const reservas = React.useMemo<IReservaBody[]>(
    () =>
      reserva.habitaciones.map(h => ({
        fecha_entrada: h.fecha_entrada as Date,
        numero_noches: h.numero_noches as number,
        cliente: reserva.cliente?.no_identificacion as string,
        habitacion: h.no_habitacion,
      })),
    [reserva]
  );

  React.useEffect(() => console.log(reservas), [reservas]);

  const crearReservas = () => {
    createReservas(reservas);
    cambiarEstadosHabitaciones(reservas.map(r => r.habitacion));
    handleNext();
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
    resetPostReservas();
  };

  return (
    <Stack
      direction="column"
      justifyContent="start"
      alignItems="stretch"
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        background: "background.default",
        boxShadow: `2px 4px 10px ${theme.palette.grey[900]}`,
        borderRadius: "20px",
      }}
      spacing={1}
    >
      <Typography
        textAlign="center"
        color="primary.main"
        variant="h4"
        component="h2"
      >
        Crear Reservas
      </Typography>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          {postReservas ? (
            <ResumenReservas
              reservas={postReservas}
              cliente={reserva.cliente || ({} as ICliente)}
            />
          ) : (
            <CircularProgress color="primary" />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleReset}>Crear nueva reserva</Button>
          </Box>
        </>
      ) : (
        <>
          {activeStep === 0 && <Clientes />}
          {activeStep === 1 && <Habitaciones />}
          {activeStep === 2 && <TerminarReserva />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                disabled={!isOk(activeStep, reserva)}
                onClick={crearReservas}
                variant="contained"
              >
                Finalizar
              </Button>
            ) : (
              <Button
                disabled={!isOk(activeStep, reserva)}
                onClick={handleNext}
                variant="contained"
              >
                Siguiente
              </Button>
            )}
          </Box>
        </>
      )}
    </Stack>
  );
};

function isOk(activeStep: number, reserva: Reserva): boolean {
  switch (activeStep) {
    case 0:
      return !!reserva.cliente;
    case 1:
      return !!reserva.habitaciones.length;
    case 2:
      return reserva.habitaciones.every(
        h => !!h.fecha_entrada && !!h.numero_noches
      );
    default:
      return true;
  }
}

interface ResumenReservasProps {
  reservas: ReservaResponse[];
  cliente: ICliente;
}

const ResumenReservas = (props: ResumenReservasProps) => {
  const { cliente } = props;
  const [reservas, setReservas] = React.useState<ReservaResponse[]>(
    props.reservas
  );
  const theme = useTheme();

  React.useEffect(() => {
    setReservas(props.reservas);
  }, [props.reservas]);

  return (
    <Stack spacing={2} sx={{ flex: 1 }}>
      <Typography variant="h5" component="h3" color="primary.main">
        Resumen
      </Typography>
      <Divider variant="fullWidth" />
      <Stack
        justifyContent="space-around"
        direction={{ xs: "column", lg: "row" }}
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
            {cliente.nombre[0].toUpperCase()}
          </Avatar>
          <Stack
            alignItems="flex-start"
            spacing={1}
            sx={{
              boxShadow: `inset 0px -2px 5px ${theme.palette.grey[900]}`,
              borderRadius: "20px",
              padding: 2,
            }}
          >
            {Object.entries(cliente).map(([key, value]) => {
              return (
                <Box key={key}>
                  {key.toUpperCase()}: {value}
                </Box>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          className="hide-scrollbar"
          sx={{
            maxHeight: "400px",
            overflow: "scroll",
          }}
        >
          {!reservas.length
            ? "Cargando..."
            : reservas?.map(reserva => (
                <Stack key={reserva?.no_reserva} spacing={0.5}>
                  <Stack
                    spacing={{ xs: 0.5, sm: 2 }}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent={{ xs: "flex-start", sm: "space-between" }}
                  >
                    <Typography
                      textAlign={{ xs: "center", sm: "left" }}
                      variant="h6"
                      component="h4"
                      color="primary.main"
                    >
                      Reserva #{reserva?.no_reserva}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography component="span">
                        {moment(reserva?.fecha_entrada)
                          .add(5, "hours")
                          .format("DD/MM/YYYY, HH:mm")}
                      </Typography>
                      <Typography component="span" color="secondary.main">
                        {reserva?.numero_noches}{" "}
                        {reserva?.numero_noches === 1 ? "noche" : "noches"}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography textAlign="center" color="text.primary">
                    Habitacion No.{reserva?.habitacion}
                  </Typography>
                  <Divider />
                </Stack>
              ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CustomStepper;
