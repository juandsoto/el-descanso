export type EstadoSolicitud = "pendiente" | "atendida" | "todas";
export default interface ISolicitud {
  id: number;
  email: string;
  nombre: string;
  telefono: string;
  estado: Omit<EstadoSolicitud, "todas">;
}
