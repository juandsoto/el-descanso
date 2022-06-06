import React from "react";
import { usoDeServicios } from "../data";
import { Doughnut } from "react-chartjs-2";

const UsoDeServiciosChart = () => {
  return (
    <Doughnut options={usoDeServicios.options} data={usoDeServicios.data} />
  );
};

export default UsoDeServiciosChart;
