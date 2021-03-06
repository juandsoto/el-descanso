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
import React from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import IronIcon from "@mui/icons-material/Iron";
import WavesIcon from "@mui/icons-material/Waves";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StarRateIcon from "@mui/icons-material/StarRate";
import toast from "react-hot-toast";
import ITipoHabitacion, {
  NombreTipoHabitacion,
} from "../interfaces/TipoHabitacion";
import ImageSlider from "./ImageSlider";
import { useAuth } from "../context/auth/index";
import EditDialog from "./EditDialog";
import useHabitaciones from "../hooks/useHabitaciones";
import useAxios from "../hooks/useAxios";
import { formatCurrency } from "../utils";

interface HabitacionModalProps {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  habitacion: ITipoHabitacion;
}

const TipoHabitacionModal = (props: HabitacionModalProps): JSX.Element => {
  const { open, handleClose, habitacion } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [precio, setPrecio] = React.useState<number>(habitacion.precio);
  const { user } = useAuth();

  const [{ data: response }, patchHabitacion] = useAxios(
    {
      method: "PATCH",
    },
    { manual: true }
  );

  const cambiarPrecioHabitacion = (
    tipo: Omit<NombreTipoHabitacion, "todas">,
    precio: number
  ) => {
    patchHabitacion({
      url: `/tipohabitacion/${tipo}/`,
      data: {
        precio,
      },
    });
  };

  React.useEffect(() => {
    response && toast.success("Precio actualizado!");
  }, [response]);

  const style: SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: "60%" },
    minHeight: { xs: "80%", sm: "70%" },
    maxHeight: "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    overflowY: "scroll",
    p: { xs: 2, sm: 4 },
    display: "flex",
    flexDirection: "column",
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
        aria-labelledby={`modal-${habitacion.tipo}`}
        aria-describedby={`modal-${habitacion.descripcion}`}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          color: "text.primary",
        }}
      >
        <Fade in={open}>
          <Box className="hide-scrollbar-y" sx={style}>
            <Box sx={{ flex: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  textTransform="capitalize"
                  id={`modal-${habitacion.tipo}`}
                  variant="h6"
                  component="h2"
                >
                  {habitacion.tipo}
                </Typography>
                <Box display="flex">
                  {[0, 0, 0, 0, 0].map((star, index) => (
                    <StarRateIcon key={index} sx={{ color: "#ffcd3c" }} />
                  ))}
                </Box>
              </Box>
              <Divider variant="fullWidth" sx={{ my: 2 }} />
              <Typography id={`modal-${habitacion.descripcion}`}>
                {habitacion.descripcion}
              </Typography>
              <ImageSlider images={habitacion.images} />
              <Box>
                <List>
                  {habitacion.servicios.map(service => (
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
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip
                variant="outlined"
                color="primary"
                label={formatCurrency(precio)}
                sx={{
                  width: { xs: "auto", sm: "10rem" },
                  cursor: "text",
                  fontSize: "1rem",
                }}
              />
              {user.rol === "" && (
                <Link
                  component={Button}
                  underline="none"
                  href="#reservar"
                  // @ts-ignore
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  Reservar
                </Link>
              )}
              {user.rol === "administrador" && (
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
                      description: `Cambiar precio de la habitacion ${habitacion.tipo}`,
                      onCancel: () => setOpenDialog(false),
                      onConfirm: (value: number) => {
                        setPrecio(value);
                        cambiarPrecioHabitacion(habitacion.tipo, value);
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

export default TipoHabitacionModal;
