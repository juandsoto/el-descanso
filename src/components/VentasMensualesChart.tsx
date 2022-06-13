import React from "react";
import { Line } from "react-chartjs-2";
import { TextField, Tooltip } from "@mui/material";
import moment from "moment";
import toast from "react-hot-toast";
import { ventasMensuales } from "../data";
import { getMonth } from "../utils";
import useVentasMensuales from "../hooks/useVentasMensuales";

const VentasMensualesChart = () => {
  const [fecha, setFecha] = React.useState<string>(moment().format("YYYY-MM"));
  const { data, getData } = useVentasMensuales();

  React.useEffect(() => {
    getData(fecha);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    getData(e.target.value);
    toast.success(
      `Ventas mensuales: ${getMonth(
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
    </>
  );
};

export default VentasMensualesChart;
