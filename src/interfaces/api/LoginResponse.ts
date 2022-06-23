import IUsuario from "../Usuario";

export interface ILoginResponse {
  access: string;
  refresh: string;
  user: Omit<IUsuario, "password">;
  detail: string;
}
