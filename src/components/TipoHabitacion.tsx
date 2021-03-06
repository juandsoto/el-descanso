import React from "react";

import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import StarRateIcon from "@mui/icons-material/StarRate";
import ITipoHabitacion from "../interfaces/TipoHabitacion";
import TipoHabitacionModal from "./TipoHabitacionModal";

interface HabitacionProps {
  habitacion: ITipoHabitacion;
  minWidth?: string;
  maxWidth?: string;
}

const TipoHabitacion = (props: HabitacionProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<ITipoHabitacion>(
    props.habitacion
  );

  const handleOpen = (habitacion: ITipoHabitacion) => {
    setOpen(true);
    setSelected(habitacion);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          minWidth: `${props.minWidth ?? "auto"}`,
          maxWidth: `${props.maxWidth ?? "350px"}`,
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.habitacion.images[0]}
        />
        <CardContent sx={{ bgcolor: "background.default" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textTransform="capitalize"
          >
            {props.habitacion.tipo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.habitacion.descripcion.slice(0, 40)}...
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "background.default",
          }}
        >
          <Stack direction="row">
            {[0, 0, 0, 0, 0].map((_, index) => (
              <StarRateIcon key={index} sx={{ color: "#ffcd3c" }} />
            ))}
          </Stack>
          <Button size="small" onClick={() => handleOpen(props.habitacion)}>
            Ver más
          </Button>
        </CardActions>
      </Card>
      <TipoHabitacionModal {...{ open, handleClose, habitacion: selected }} />
    </>
  );
};

export default TipoHabitacion;
