import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";
import { EstadoHabitacion } from "../interfaces/Habitacion";
import { EstadoSolicitud } from "../interfaces/Solicitud";

type UseFilterAllowed =
  | EstadoSolicitud
  | EstadoHabitacion
  | NombreTipoHabitacion;

const useFilter = <T extends UseFilterAllowed>(defaultValue: T) => {
  const [filtro, setFiltro] = React.useState<T>(defaultValue);
  const handleChange = (e: SelectChangeEvent) => {
    setFiltro(e.target.value as T);
  };

  return {
    filtro,
    handleChange,
  };
};

export default useFilter;
