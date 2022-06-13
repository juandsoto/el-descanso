import { TextField, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

const ChartLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [fecha, setFecha] = React.useState<Date>(new Date());
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(new Date(e.target.value));
  };
  return (
    <>
      {children}
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

export default ChartLayout;
