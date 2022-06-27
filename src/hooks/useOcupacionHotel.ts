import React from "react";
import { useAuth } from "../context/auth";
import useAxios from "./useAxios";
import { ocupacionHotel } from "../data";

interface Response {
  Ventas: [{ [key: string]: string }];
  total_ventas: number;
}

const useOcupacionHotel = () => {
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
      options: ocupacionHotel.options,
      data: {
        labels: ocupacionHotel.data.labels,
        datasets: [
          {
            ...ocupacionHotel.data.datasets[0],
            data: data
              ? ocupacionHotel.data.labels.map(dia => {
                  return (
                    Object.entries(data.Ventas[0]).find(([key, value]) => {
                      return key.split("-")[2] === dia;
                    })?.[1] ?? 0
                  );
                })
              : ocupacionHotel.data.datasets[0].data,
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
export default useOcupacionHotel;
