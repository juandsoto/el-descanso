import * as React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUsuario } from "../../interfaces/Usuario";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface IAuthContext {
  user: Partial<IUsuario>;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUsuario> | null>>;
  logout: () => void;
}

const initialUser: IUsuario = {
  nombre: "",
  rol: "",
  usuario: "",
  contraseña: "",
  telefono: "",
  id: "",
};

const AuthContext = React.createContext<IAuthContext>({
  user: initialUser,
} as IAuthContext);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useLocalStorage<Partial<IUsuario> | null>("user");

  const logout = () => setUser(initialUser);

  return (
    <AuthContext.Provider value={{ user: user!, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
