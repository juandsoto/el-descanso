import { useParams } from "react-router-dom";

const TipoHabitacion = () => {
  const { habitacion_id } = useParams();
  return <div>TipoHabitacion: {habitacion_id}</div>;
};

export default TipoHabitacion;
