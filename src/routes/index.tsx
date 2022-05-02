import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/index";
import {
  Home,
  Login,
  ReservaDetail,
  HabitacionDetail,
  ServicioDetail,
  Admin,
  Recepcionista,
  Gerente,
  Cajero,
} from "../pages";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
  path: string;
}

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { user } = useAuth();
  return (user && user.rol === path) || user.rol === "administrador" ? (
    <>{children}</>
  ) : (
    <Navigate to="/el-descanso/login" />
  );
};

interface Route {
  path: string;
  element: JSX.Element;
}

const routes: Route[] = [
  { path: "", element: <Home /> },
  { path: "login", element: <Login /> },
  {
    path: "administrador",
    element: (
      <ProtectedRoute path="administrador">
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "recepcionista",
    element: (
      <ProtectedRoute path="recepcionista">
        <Recepcionista />
      </ProtectedRoute>
    ),
  },
  {
    path: "gerente",
    element: (
      <ProtectedRoute path="gerente">
        <Gerente />
      </ProtectedRoute>
    ),
  },
  {
    path: "cajero",
    element: (
      <ProtectedRoute path="cajero">
        <Cajero />
      </ProtectedRoute>
    ),
  },
];

const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/el-descanso">
          {routes.map((props, index) => (
            <Route key={index} {...props}></Route>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
