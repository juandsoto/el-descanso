import { Line } from "react-chartjs-2";
import { ventasMensuales } from "../data";

const LineChart = (): JSX.Element => {
  return <Line options={ventasMensuales.options} data={ventasMensuales.data} />;
};

export default LineChart;
