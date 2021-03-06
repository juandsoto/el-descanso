import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/index";
import { Home, Login, Admin, Recepcionista, Gerente, Cajero } from "../pages";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
  path: string;
}

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user.rol?.length) return <Navigate to="/login" />;
  // if (!user.rol?.length) return <Navigate to="/el-descanso/login" />;
  if (user.rol === "administrador" || user.rol === "gerente")
    return <>{children}</>;
  if (user.rol === path) return <>{children}</>;

  return <Navigate to={`/${user.rol}`} />;
  // return <Navigate to={`/el-descanso/${user.rol}`} />;
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
  {
    path: "*",
    // element: <Navigate to="/el-descanso/" />,
    element: <Navigate to="/" />,
  },
];

const Navigator = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {routes.map((props, index) => (
          <Route key={index} {...props}></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
