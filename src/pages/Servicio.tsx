import { useParams } from "react-router-dom";

const Servicio = () => {
	const { servicio_id } = useParams();
	return (
		<div>Servicio: { servicio_id }</div>
	);
};

export default Servicio;