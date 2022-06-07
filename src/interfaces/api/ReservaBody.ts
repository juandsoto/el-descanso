import IReserva from "../Reserva";
export default interface IReservaBody
  extends Pick<IReserva, "fecha_entrada" | "numero_noches"> {
  cliente: string;
  habitacion: number;
}
