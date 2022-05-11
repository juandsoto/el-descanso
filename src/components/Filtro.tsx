import {
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { EstadoHabitacion } from "../interfaces/Habitacion";
import { EstadoSolicitud } from "../interfaces/Solicitud";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";
interface FiltroProps<T> {
  filtro: T;
  opciones: T[];
  nombre: string;
  handleChange: (e: SelectChangeEvent) => void;
}

const Filtro = <
  T extends EstadoHabitacion | EstadoSolicitud | NombreTipoHabitacion
>(
  props: FiltroProps<T>
) => {
  return (
    <FormControl sx={{ minWidth: 80 }} size="small">
      <Tooltip title={`Filtrar por ${props.nombre}`}>
        <InputLabel id="filter-select">Filtrar</InputLabel>
      </Tooltip>
      <Select
        labelId="filter-select"
        id="filter-select-id"
        value={props.filtro}
        onChange={props.handleChange}
        autoWidth
        label={`Filtrar por ${props.nombre}`}
      >
        {props.opciones.map((opcion, index) => (
          <MenuItem
            key={index}
            value={opcion}
            sx={{ textTransform: "capitalize" }}
          >
            {opcion}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filtro;
