import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Reservas, Reserva, Habitaciones, Habitacion, Servicios, Servicio, Estadisticas, Admin } from '../pages';

interface Route {
	path: string;
	element: JSX.Element;
}

const routes: Route[] = [
	{ path: '', element: <Home /> },
	{ path: 'login', element: <Login /> },
	{ path: 'reservas', element: <Reservas /> },
	{ path: 'reservas/:reserva_id', element: <Reserva /> },
	{ path: 'habitaciones', element: <Habitaciones /> },
	{ path: 'habitaciones/:habitacion_id', element: <Habitacion /> },
	{ path: 'servicios', element: <Servicios /> },
	{ path: 'servicios/:servicio_id', element: <Servicio /> },
	{ path: 'estadisticas', element: <Estadisticas /> },
	{ path: 'admin', element: <Admin /> },
];

const Navigator = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/el-descanso'>
					{ routes.map((props, index) => <Route key={ index } { ...props } ></Route>) }
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Navigator;