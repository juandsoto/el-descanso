import * as React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUsuario } from "../../interfaces/Usuario";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type Auth = Omit<IUsuario, "password"> & { token: string };

interface IAuthContext {
  user: Auth;
  setUser: React.Dispatch<React.SetStateAction<Auth | null>>;
  logout: () => void;
}

const initialUser: Auth = {
  nombre: "",
  rol: "",
  username: "",
  telefono: "",
  id: "",
  token: "",
};

const AuthContext = React.createContext<IAuthContext>({
  user: initialUser,
} as IAuthContext);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useLocalStorage<Auth | null>("user");

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
