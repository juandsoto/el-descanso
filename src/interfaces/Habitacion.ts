import { NombreTipoHabitacion } from "./TipoHabitacion";

export type EstadoHabitacion = "disponible" | "reservada" | "ocupada" | "todas";
export default interface IHabitacion {
  no_habitacion: number;
  tipo: Omit<NombreTipoHabitacion, "todas">;
  precio?: number;
  estado: Omit<EstadoHabitacion, "todas">;
}
