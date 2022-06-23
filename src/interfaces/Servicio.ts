export type CodServicio =
  | "llamadas"
  | "restaurante"
  | "bar"
  | "lavado"
  | "planchado";
export default interface IServicio {
  cod_servicio: CodServicio;
  nombre: string;
  precio: number;
}
