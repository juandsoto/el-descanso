import IHabitacion from "./Habitacion";
import IReserva from "./Reserva";

interface IReservaHabitacion {
  id: number;
  reserva: IReserva;
  habitacion: IHabitacion;
}

export default IReservaHabitacion;
