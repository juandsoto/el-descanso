import { useParams } from "react-router-dom";

const Habitacion = () => {
	const { habitacion_id } = useParams();
	return (
		<div>Habitacion: { habitacion_id }</div>
	);
};

export default Habitacion;