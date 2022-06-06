import IHabitacion from "../Habitacion";
import { NombreTipoHabitacion } from "../TipoHabitacion";

export default interface IHabitacionBody extends Omit<IHabitacion, "tipo"> {
  tipo: Omit<NombreTipoHabitacion, "todas">;
}
