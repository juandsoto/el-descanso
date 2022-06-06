export type NombreTipoHabitacion =
  | "sencilla"
  | "doble"
  | "matrimonial"
  | "suite sencilla"
  | "suite presidencial"
  | "todas";

export default interface ITipoHabitacion {
  tipo: Omit<NombreTipoHabitacion, "todas">;
  images: string[];
  descripcion: string;
  precio: number;
  servicios: string[];
}
