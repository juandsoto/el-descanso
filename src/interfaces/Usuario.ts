type Rol = "gerente" | "cajero" | "recepcionista" | "administrador";

export interface IUsuario {
  id: string;
  nombre: string;
  usuario: string;
  contraseña: string;
  rol: Rol | "";
  telefono: string;
}
