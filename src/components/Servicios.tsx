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
import { availableServices, nombreServicios } from "../data";
import IAvailableServices from "../interfaces/AvailableServices";
interface ServiciosProps {
  bgImage?: boolean;
  fullWidth?: boolean;
}

const Servicios = (props: ServiciosProps): JSX.Element => {
  const theme = useTheme();
  const [servicios, setServicios] =
    React.useState<IAvailableServices[]>(availableServices);

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
          [servicio]: !prev[index][servicio as keyof IAvailableServices],
        },
        ...prev.slice(index + 1),
      ] as IAvailableServices[];
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
          width: "100%",
          boxShadow: `2px 2px 7px ${theme.palette.grey[900]}`,
        }}
      >
        <Table
          sx={{ minWidth: 650, bgcolor: "background.default" }}
          aria-label="simple table"
        >
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
                key={`servicio ${servicio.habitacion}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {servicio.habitacion}
                </TableCell>
                {nombreServicios.map((item: string, index) => {
                  return (
                    <>
                      {user.rol === "administrador" ? (
                        <TableCell
                          key={`admin ${servicio.habitacion}-${index}`}
                          align="center"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            toggleService(servicio.habitacion, item)
                          }
                        >
                          <Tooltip title="modificar" followCursor>
                            {/*ts-ignore*/}
                            {servicio[item as keyof IAvailableServices] ? (
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
                        <TableCell
                          align="center"
                          key={`${servicio.habitacion}-${index}`}
                        >
                          {/*ts-ignore*/}
                          {servicio[item as keyof IAvailableServices] ? (
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
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Servicios;
