export type EstadoSolicitud = "pendiente" | "atendida" | "todas";
export default interface ISolicitud {
  id: string;
  correo: string;
  nombre: string;
  telefono: string;
  estado: Omit<EstadoSolicitud, "todas">;
}
