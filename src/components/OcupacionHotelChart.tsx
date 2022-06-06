import React from "react";
import { Line } from "react-chartjs-2";
import { ocupacionHotel } from "../data";
import { TextField, Tooltip } from "@mui/material";
import { useScreenshot } from "use-react-screenshot";
import moment from "moment";
import toast from "react-hot-toast";
import { getMonth } from "../utils";

const OcupacionHotelChart = () => {
  const [fecha, setFecha] = React.useState<Date>(new Date());

  // const ref = React.useRef(null);
  // const [image, setImage] = React.useState<string>();

  // const getImage = React.useCallback(() => {
  //   const link = document.createElement("a");
  //   link.download = "chart.png";
  //   //@ts-ignore
  //   setImage(ref.current?.toBase64Image());
  //   //@ts-ignore
  //   link.href = ref.current?.toBase64Image();
  //   link.click();
  // }, []);

  //TODO: API call moment(fecha).format("MM/YYYY")
  // React.useEffect(() => {
  // },[fecha])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(new Date(e.target.value));
    toast.success(
      `Ocupación del hotel: ${getMonth(
        moment(e.target.value).format("MM")
      )} - ${moment(e.target.value).format("YYYY")}`
    );
  };
  return (
    <>
      <Line
        // ref={ref}
        options={ocupacionHotel.options}
        data={ocupacionHotel.data}
      />
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
            max: moment(new Date()).format("yyyy-MM"),
          }}
          id="month"
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

export default OcupacionHotelChart;
