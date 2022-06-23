export default interface FacturaBody {
  no_factura: number;
  fecha_factura: Date;
  precio_total: number;
  reserva: number;
  checkout: null;
}
