import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import toast from "react-hot-toast";
import { TextField, Tooltip } from "@mui/material";
import { ocupacionHotel } from "../data";
import { getMonth } from "../utils";

const OcupacionHotelChart = () => {
  const [fecha, setFecha] = React.useState<string>(moment().format("YYYY-MM"));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    toast.success(
      `Ocupación del hotel: ${getMonth(
        moment(e.target.value).format("MM-YYYY")
      )}`
    );
  };
  return (
    <>
      <Line options={ocupacionHotel.options} data={ocupacionHotel.data} />
      <Tooltip title={`Fecha: ${moment(fecha).format("MM/YYYY")}`}>
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
          id="month"
          name="fecha_entrada"
          value={fecha}
          onChange={onChange}
          type="month"
        />
      </Tooltip>
    </>
  );
};

export default OcupacionHotelChart;
