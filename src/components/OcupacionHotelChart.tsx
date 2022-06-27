import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import toast from "react-hot-toast";
import { TextField, Tooltip } from "@mui/material";
import { diasLabels, ocupacionHotel } from "../data";
import { getMonth } from "../utils";

const OcupacionHotelChart = () => {
  const [fecha, setFecha] = React.useState<string>(moment().format("YYYY-MM"));
  // const { data, getData } = useOcupacionHotel();

  // React.useEffect(() => {
  //   getData(fecha);
  // }, []);
  const data = React.useMemo(() => {
    if (!fecha) return;
    const isCurrentMonth = moment().get("month") === moment(fecha).get("month");
    console.log({ isCurrentMonth });

    const data = isCurrentMonth
      ? diasLabels.map((day, index) => {
          return Number(day) > Number(moment().format("DD"))
            ? 0
            : Math.floor(Math.random() * 100);
        })
      : diasLabels.map((_, index) => Math.floor(Math.random() * 100));

    return {
      options: ocupacionHotel.options,
      data: {
        ...ocupacionHotel.data,
        datasets: [
          {
            ...ocupacionHotel.data.datasets[0],
            data,
          },
        ],
      },
    };
  }, [fecha]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    toast.success(
      `Ocupación del hotel: ${getMonth(
        moment(e.target.value).format("MM")
      )} - ${moment(e.target.value).format("YYYY")}`
    );
  };
  return (
    <>
      <Line {...(data as any)} />
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
