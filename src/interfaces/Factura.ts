import ICheckout from "./Checkout";
import IReserva from "./Reserva";
export default interface IFactura {
  no_factura: number;
  fecha_factura: Date;
  precio_total: number;
  reserva: IReserva;
  checkout: ICheckout | null;
}
