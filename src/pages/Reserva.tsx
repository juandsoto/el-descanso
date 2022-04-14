import { useParams } from "react-router-dom";

const Reserva = () => {
	const { reserva_id } = useParams();
	return (
		<div>Reserva: { reserva_id }</div>
	);
};

export default Reserva;