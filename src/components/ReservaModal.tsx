import React from "react";
import { Box, Backdrop, Modal, Fade, Typography, Divider } from "@mui/material";
import { useReserva } from "../context/reserva/index";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "60%" },
  minHeight: { xs: "80%", sm: "70%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

interface ReservaModalProps {
  open: boolean;
  handleClose: () => void;
}

const ReservaModal = (props: ReservaModalProps) => {
  const { reserva } = useReserva();
  const theme = useTheme();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ color: theme.palette.text.primary }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {reserva.cliente
              ? `Reserva en progreso para el cliente ${reserva.cliente.nombre}`
              : "Reserva en progreso..."}
          </Typography>
          <Divider variant="fullWidth" />
          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            <pre>{JSON.stringify(reserva.cliente, null, 2)}</pre>
            {reserva.habitaciones.map((habitacion, index) => (
              <pre key={index}>{JSON.stringify(habitacion, null, 2)}</pre>
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default ReservaModal;
