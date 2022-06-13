export default interface IUsoDeServiciosResponse {
  ventas_servicio: {
    llamadas: number;
    restaurante: number;
    bar: number;
    lavado: number;
    planchado: number;
  };
  total_ventas: number;
}
