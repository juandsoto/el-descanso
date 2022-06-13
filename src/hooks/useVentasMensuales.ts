import React from "react";
import { useAuth } from "../context/auth/index";
import useAxios from "./useAxios";
import { ventasMensuales } from "../data/index";

interface Response {
  Ventas: [{ [key: string]: string }];
  total_ventas: number;
}

const useVentasMensuales = () => {
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [{ data, loading }, fetchData] = useAxios<Response>(
    {
      headers,
    },
    { manual: true }
  );

  const chart = React.useMemo(() => {
    return {
      options: ventasMensuales.options,
      data: {
        labels: ventasMensuales.data.labels,
        datasets: [
          {
            ...ventasMensuales.data.datasets[0],
            data: data
              ? ventasMensuales.data.labels.map(dia => {
                  return (
                    Object.entries(data.Ventas[0]).find(([key, value]) => {
                      return key.split("-")[2] === dia;
                    })?.[1] ?? 0
                  );
                })
              : ventasMensuales.data.datasets[0].data,
          },
        ],
      },
    };
  }, [data]);

  const getData = (fecha: string) => {
    fetchData({
      url: `/facturasmes/?fecha_factura=${fecha}`,
    });
  };

  return {
    data: chart,
    getData,
  };
};
export default useVentasMensuales;
