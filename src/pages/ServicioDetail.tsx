import { useParams } from "react-router-dom";

const ServicioDetail = () => {
  const { servicio_id } = useParams();
  return <div>ServicioDetail: {servicio_id}</div>;
};

export default ServicioDetail;
