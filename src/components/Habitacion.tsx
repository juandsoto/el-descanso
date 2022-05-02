import { useState } from "react";

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
import { IHabitacion } from "../interfaces/Habitacion";
import HabitacionModal from "./HabitacionModal";

interface HabitacionProps {
  habitacion: IHabitacion;
  minWidth?: string;
  maxWidth?: string;
}

const Habitacion = (props: HabitacionProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IHabitacion>(props.habitacion);

  const handleOpen = (habitacion: IHabitacion) => {
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
          alt={props.habitacion.name}
          height="140"
          image={props.habitacion.images[0]}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textTransform="capitalize"
          >
            {props.habitacion.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.habitacion.description.slice(0, 80)}...
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
      <HabitacionModal {...{ open, handleClose, habitacion: selected }} />
    </>
  );
};

export default Habitacion;
