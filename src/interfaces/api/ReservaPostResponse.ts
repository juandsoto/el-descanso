export default interface IReservaPostResponse {
  detail: string;
  reserva: {
    no_reserva: number;
    fecha_entrada: Date;
    numero_noches: number;
    cliente: string;
    habitacion: number;
    cancelada: boolean;
  };
}
export interface ReservaResponse {
  no_reserva: number;
  fecha_entrada: Date;
  numero_noches: number;
  cliente: string;
  habitacion: number;
  cancelada: boolean;
}
