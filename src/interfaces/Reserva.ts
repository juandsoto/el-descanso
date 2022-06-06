import ICliente from "./Cliente";
import IHabitacion from "./Habitacion";
interface IReserva {
  no_reserva?: string;
  fecha_entrada: Date;
  numero_noches: number;
  cliente: ICliente;
  habitacion: IHabitacion;
}
export default IReserva;
