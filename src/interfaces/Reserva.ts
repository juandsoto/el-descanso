import ICliente from "./Cliente";
import IHabitacion from "./Habitacion";
interface IReserva {
  no_reserva: number;
  fecha_entrada: Date;
  numero_noches: number;
  cliente: ICliente;
  habitacion: IHabitacion;
  cancelada: boolean;
}
export default IReserva;
