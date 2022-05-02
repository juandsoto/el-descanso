import { useParams } from "react-router-dom";

const ReservaDetail = () => {
  const { reserva_id } = useParams();
  return <div>ReservaDetail: {reserva_id}</div>;
};

export default ReservaDetail;
