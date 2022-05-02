import {
  Backdrop,
  SxProps,
  Box,
  Modal,
  Fade,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Link,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { IHabitacion } from "../interfaces/Habitacion";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import IronIcon from "@mui/icons-material/Iron";
import WavesIcon from "@mui/icons-material/Waves";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StarRateIcon from "@mui/icons-material/StarRate";
import ImageSlider from "./ImageSlider";
import { useAuth } from "../context/auth/index";
import React from "react";
import EditDialog from "./EditDialog";

interface HabitacionModalProps {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  habitacion: IHabitacion;
}

const HabitacionModal = (props: HabitacionModalProps): JSX.Element => {
  const { open, handleClose, habitacion } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [precio, setPrecio] = React.useState<number>(habitacion.price);
  const theme = useTheme();
  const { user } = useAuth();

  const style: SxProps = {
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

  const serviceIcon = (name: string) => {
    switch (name) {
      case "restaurante":
        return <RestaurantMenuIcon />;
      case "llamadas de larga distancia":
        return <LocalPhoneIcon />;
      case "lavado":
        return <WavesIcon />;
      case "planchado":
        return <IronIcon />;
      case "bar":
        return <LocalBarIcon />;
      default:
        return <RestaurantMenuIcon />;
    }
  };

  return (
    <Box>
      <Modal
        aria-labelledby={`modal-${habitacion.name}`}
        aria-describedby={`modal-${habitacion.description}`}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ color: theme.palette.text.primary }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                textTransform="capitalize"
                id={`modal-${habitacion.name}`}
                variant="h6"
                component="h2"
              >
                {habitacion.name}
              </Typography>
              <Box display="flex">
                {[0, 0, 0, 0, 0].map((star, index) => (
                  <StarRateIcon key={index} sx={{ color: "#ffcd3c" }} />
                ))}
              </Box>
            </Box>
            <Divider variant="fullWidth" />
            <Typography id={`modal-${habitacion.description}`} sx={{ mt: 2 }}>
              {habitacion.description}
            </Typography>
            <ImageSlider images={habitacion.images} />
            <Box>
              <List>
                {habitacion.services.map(service => (
                  <ListItem key={service}>
                    <ListItemIcon>{serviceIcon(service)}</ListItemIcon>
                    <ListItemText
                      sx={{
                        textTransform: "capitalize",
                      }}
                      primary={service}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip
                variant="outlined"
                color="primary"
                label={new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                }).format(precio)}
                sx={{
                  width: { xs: "auto", sm: "10rem" },
                  cursor: "text",
                  fontSize: "1rem",
                }}
              />
              {user.rol !== "administrador" ? (
                <Link
                  component={Button}
                  underline="none"
                  href="#reservar"
                  // @ts-ignore
                  onClick={handleClose}
                  sx={{
                    display: { xs: "none", sm: "block" },
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  Reservar
                </Link>
              ) : (
                <>
                  <Button onClick={() => setOpenDialog(true)}>
                    editar precio
                  </Button>
                  <EditDialog
                    open={openDialog}
                    handleClose={() => setOpenDialog(false)}
                    inputType="number"
                    dialogInfo={{
                      title: "Editar Precio",
                      name: "precio",
                      description: `Cambiar precio de la habitacion ${habitacion.name}`,
                      onCancel: () => setOpenDialog(false),
                      onConfirm: (value: number) => {
                        setPrecio(value);
                        setOpenDialog(false);
                      },
                    }}
                  />
                </>
              )}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default HabitacionModal;
