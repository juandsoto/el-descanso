import ITipoHabitacion from "./TipoHabitacion";
//TODO: cambiar tipado de tipo
export type EstadoHabitacion = "disponible" | "reservada" | "ocupada" | "todas";
export default interface IHabitacion {
  no_habitacion: number;
  tipo: Omit<ITipoHabitacion, "images" | "servicios">;
  estado: Omit<EstadoHabitacion, "todas">;
}
