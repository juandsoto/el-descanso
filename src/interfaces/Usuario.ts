export type Rol = "gerente" | "cajero" | "recepcionista" | "administrador" | "";

export interface IUsuario {
  id: string;
  nombre: string;
  username: string;
  password: string;
  rol: Rol;
  telefono: string;
}
