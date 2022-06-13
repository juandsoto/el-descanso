import React from "react";
import { Line } from "react-chartjs-2";
import { TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import toast from "react-hot-toast";
import { ventasMensualesPorServicio } from "../data";
import { getMonth } from "../utils";
import useVentasPorServicio from "../hooks/useVentasPorServicio";

const VentasPorServicioChart = () => {
  const [fecha, setFecha] = React.useState<string>(moment().format("YYYY-MM"));
  const { data, getData } = useVentasPorServicio();

  React.useEffect(() => {
    getData(fecha);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    getData(e.target.value);
    toast.success(
      `Ventas mensuales por servicio: ${getMonth(
        moment(e.target.value).format("MM")
      )} - ${moment(e.target.value).format("YYYY")}`
    );
  };
  return (
    <>
      <Line {...data} />
      <Tooltip title={`Fecha: ${fecha}`}>
        <TextField
          sx={{
            position: "absolute",
            right: "0rem",
            top: "1.5rem",
            width: "3rem",
            bgcolor: { xs: "auto", sm: "white" },
            borderRadius: 1,
          }}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: moment().format("yyyy-MM"),
          }}
          name="fecha_entrada"
          value={fecha}
          onChange={onChange}
          type="month"
        />
      </Tooltip>
      {!data.data.labels.length && (
        <Typography textAlign="center" color="error">
          No existen datos en el mes de {getMonth(fecha.split("-")[1])} de{" "}
          {fecha.split("-")[0]} <br />
          Selecciona otro mes!
        </Typography>
      )}
    </>
  );
};

export default VentasPorServicioChart;
