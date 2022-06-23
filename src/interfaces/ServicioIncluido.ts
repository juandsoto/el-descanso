import IServicio from "./Servicio";
export default interface IServicioIncluido {
  id: number;
  servicio: IServicio;
  factura: number;
  fecha_servicio: Date;
}
