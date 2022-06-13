import React from "react";
import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { usoDeServicios } from "../data";
import useAxios from "../hooks/useAxios";
import IUsoDeServiciosResponse from "../interfaces/api/UsoDeServiciosResponse";
import { useAuth } from "../context/auth/index";

const UsoDeServiciosChart = () => {
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };
  const [{ data }] = useAxios<IUsoDeServiciosResponse>({
    url: "/serviciosmes/?fecha_servicio=20",
    headers,
  });

  const chart = React.useMemo(
    () => ({
      options: usoDeServicios.options,
      data: {
        labels: data
          ? Object.keys(data.ventas_servicio)
          : usoDeServicios.data.labels,
        datasets: [
          {
            ...usoDeServicios.data.datasets[0],
            data: data
              ? Object.values(data.ventas_servicio).map(
                  (value: number) => value
                )
              : usoDeServicios.data.datasets[0].data,
          },
        ],
      },
    }),
    [data]
  );

  return (
    <Box position="relative">
      <Doughnut {...chart} />
      <Typography
        variant="subtitle2"
        component="span"
        color="secondary.main"
        sx={{ position: "absolute", top: 7, right: 10 }}
      >
        Total: {data?.total_ventas}
      </Typography>
    </Box>
  );
};

export default UsoDeServiciosChart;
