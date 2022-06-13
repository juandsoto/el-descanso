export type Rol = "gerente" | "cajero" | "recepcionista" | "administrador" | "";

export default interface IUsuario {
  id: string;
  nombre: string;
  username: string;
  password: string;
  rol: Rol;
  telefono: string;
}
