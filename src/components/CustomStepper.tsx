import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import StepLabel from "@mui/material/StepLabel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { Habitaciones } from ".";
import Clientes from "./Clientes";
import TerminarReserva from "./TerminarReserva";
import { Reserva, useReserva } from "../context/reserva/index";
import IReservaBody from "../interfaces/api/ReservaBody";
import useReservas from "../hooks/useReservas";

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
  const { createReserva } = useReservas();

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
    reservas.forEach(createReserva);
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
          <Typography sx={{}}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleReset}>Nuevo</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ flex: 1, display: activeStep === 0 ? "block" : "none" }}>
            <Clientes />
          </Box>
          <Box sx={{ flex: 1, display: activeStep === 1 ? "block" : "none" }}>
            <Habitaciones />
          </Box>
          <Box sx={{ flex: 1, display: activeStep === 2 ? "block" : "none" }}>
            <TerminarReserva />
          </Box>
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
export default CustomStepper;
