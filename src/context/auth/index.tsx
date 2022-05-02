import * as React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUsuario } from "../../interfaces/Usuario";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface IAuthContext {
  user: Partial<IUsuario>;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUsuario> | null>>;
}

const AuthContext = React.createContext<IAuthContext>({
  user: {
    nombre: "",
    rol: "",
    usuario: "",
    contraseña: "",
    telefono: "",
    id: "",
  },
} as IAuthContext);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useLocalStorage<Partial<IUsuario> | null>("user");

  return (
    <AuthContext.Provider value={{ user: user!, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
