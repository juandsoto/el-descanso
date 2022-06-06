import React from "react";
import { Line } from "react-chartjs-2";
import { ventasMensualesPorServicio } from "../data";
import { TextField, Tooltip } from "@mui/material";
import moment from "moment";
import toast from "react-hot-toast";
import { getMonth } from "../utils";

const VentasPorServicioChart = () => {
  const [fecha, setFecha] = React.useState<Date>(new Date());

  //TODO: API call moment(fecha.getTime() + 1000 * 60 * 60 * 6).format("yyyy-MM")
  // React.useEffect(() => {
  // },[fecha])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(new Date(e.target.value));
    toast.success(
      `Ventas mensuales por servicio: ${getMonth(
        moment(e.target.value).format("MM")
      )} - ${moment(e.target.value).format("YYYY")}`
    );
  };
  return (
    <>
      <Line
        options={ventasMensualesPorServicio.options}
        data={ventasMensualesPorServicio.data}
      />
      <Tooltip
        title={`Fecha: ${moment(fecha.getTime() + 1000 * 60 * 60 * 6).format(
          "MM/YYYY"
        )}`}
      >
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
            max: moment(new Date()).format("yyyy-MM"),
          }}
          name="fecha_entrada"
          value={fecha}
          onChange={onChange}
          type="month"
        />
      </Tooltip>
      {/* <button style={{ marginBottom: "10px" }} onClick={getImage}>
        Take screenshot
      </button> */}
    </>
  );
};

export default VentasPorServicioChart;
