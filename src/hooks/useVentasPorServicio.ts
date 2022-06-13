import React from "react";
import { useAuth } from "../context/auth/index";
import useAxios from "./useAxios";
import IUsoDeServiciosResponse from "../interfaces/api/UsoDeServiciosResponse";
import { ventasMensualesPorServicio } from "../data/index";
import IServicio from "../interfaces/Servicio";

const useVentasPorServicio = () => {
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };
  const [{ data: servicios, loading: loadingServicios }] = useAxios<
    IServicio[]
  >({
    url: "/servicios/",
  });

  const [{ data: cantidad, loading: loadingCantidad }, getCantidad] =
    useAxios<IUsoDeServiciosResponse>(
      {
        headers,
      },
      { manual: true }
    );

  const chart = React.useMemo(() => {
    return {
      options: ventasMensualesPorServicio.options,
      data: {
        labels: servicios
          ? [...Object.keys(cantidad?.ventas_servicio || {})]
          : ventasMensualesPorServicio.data.labels,
        datasets: [
          {
            ...ventasMensualesPorServicio.data.datasets[0],
            data:
              cantidad && servicios
                ? Object.entries(cantidad.ventas_servicio).map(([key, c]) => {
                    return (
                      c * servicios.find(s => s.cod_servicio === key)?.precio!
                    );
                  })
                : ventasMensualesPorServicio.data.datasets[0].data,
          },
        ],
      },
    };
  }, [cantidad]);

  const getData = (fecha: string) => {
    getCantidad({
      url: `/serviciosmes/?fecha_servicio=${fecha}`,
    });
  };

  return {
    data: chart,
    getData,
  };
};
export default useVentasPorServicio;
