import {
  useTheme,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useAuth } from "../context/auth/index";

export interface IServicio {
  habitacion: string;
  restaurante: boolean;
  llamadas: boolean;
  lavado: boolean;
  planchado: boolean;
  bar: boolean;
}

const rows: IServicio[] = [
  {
    habitacion: "Sencilla",
    restaurante: true,
    llamadas: false,
    lavado: false,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Doble",
    restaurante: true,
    llamadas: true,
    lavado: false,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Matrimonial",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Suite Sencilla",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: true,
    bar: false,
  },
  {
    habitacion: "Suite Presidencial",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: true,
    bar: true,
  },
];

interface ServiciosProps {
  bgImage?: boolean;
  fullWidth?: boolean;
}

const Servicios = (props: ServiciosProps): JSX.Element => {
  const theme = useTheme();
  const [servicios, setServicios] = React.useState<IServicio[]>(rows);

  const { user } = useAuth();

  const toggleService = (habitacionName: string, servicio: string) => {
    const index = servicios.findIndex(
      item => item.habitacion === habitacionName
    );
    setServicios(prev => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          [servicio]: !prev[index][servicio as keyof IServicio],
        },
        ...prev.slice(index + 1),
      ] as IServicio[];
    });
  };

  return (
    <Box
      // className={`${props.bgImage ? "blob" : ""}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        color={theme.palette.primary.main}
      >
        Servicios
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: `${props.fullWidth ? "95%" : "80%"}`,
          boxShadow: "2px 2px 7px #666",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Habitaciones / Servicios</TableCell>
              <TableCell align="center">Restaurante</TableCell>
              <TableCell align="center">Llamadas de larga distancia</TableCell>
              <TableCell align="center">Lavado</TableCell>
              <TableCell align="center">Planchado</TableCell>
              <TableCell align="center">Bar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.map((servicio, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {servicio.habitacion}
                </TableCell>
                {["restaurante", "llamadas", "lavado", "planchado", "bar"].map(
                  (item: string, index) => {
                    return (
                      <>
                        {user.rol === "administrador" ? (
                          <TableCell
                            key={`${i}-${index}`}
                            align="center"
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              toggleService(servicio.habitacion, item)
                            }
                          >
                            <Tooltip title="modificar" followCursor>
                              {/*ts-ignore*/}
                              {servicio[item as keyof IServicio] ? (
                                <CheckIcon
                                  sx={{ color: "#0CB0A9", fontSize: "2rem" }}
                                />
                              ) : (
                                <CloseIcon
                                  sx={{ color: "#f00", fontSize: "2rem" }}
                                />
                              )}
                            </Tooltip>
                          </TableCell>
                        ) : (
                          <TableCell align="center" key={`${item}-${index}`}>
                            {/*ts-ignore*/}
                            {servicio[item as keyof IServicio] ? (
                              <CheckIcon
                                sx={{ color: "#0CB0A9", fontSize: "2rem" }}
                              />
                            ) : (
                              <CloseIcon
                                sx={{ color: "#f00", fontSize: "2rem" }}
                              />
                            )}
                          </TableCell>
                        )}
                      </>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Servicios;
