export type NombreTipoHabitacion =
  | "sencilla"
  | "doble"
  | "matrimonial"
  | "suite sencilla"
  | "suite presidencial"
  | "todas";

export default interface ITipoHabitacion {
  nombre: Omit<NombreTipoHabitacion, "todas">;
  images: string[];
  description: string;
  precio: number;
  services: string[];
}
