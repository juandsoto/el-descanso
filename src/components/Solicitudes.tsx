import React from "react";
import ISolicitud, { EstadoSolicitud } from "../interfaces/Solicitud";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/auth/index";
import CircularProgress from "@mui/material/CircularProgress";

const SOLICITUD: ISolicitud = {
  id: 0,
  email: "",
  nombre: "",
  telefono: "",
  estado: "",
};

const Solicitudes = () => {
  const { user } = useAuth();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [{ data: solicitudes, loading }] = useAxios<{
    solicitudes: ISolicitud[];
  }>({
    url: "/solicitudfilter/?estado=pendiente",
    headers,
  });
  const [state, setState] = React.useState<ISolicitud[]>([]);

  React.useEffect(() => {
    setState(solicitudes?.solicitudes ?? []);
  }, [solicitudes]);

  const [{ data: _, loading: loadingPatch }, patchData] = useAxios<
    ISolicitud,
    Pick<ISolicitud, "estado">
  >(
    {
      method: "PATCH",
      headers,
    },
    { manual: true }
  );

  const theme = useTheme();

  const onSetSolicitud = (id: number) => {
    patchData({
      url: `/solicitud/${id}/`,
      data: {
        estado: "atendida",
      },
    });
    setState(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Stack alignItems="stretch">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography
          variant="h4"
          component="h2"
          color="primary.main"
          fontSize={{ xs: "1.5rem", sm: "2rem" }}
        >
          Solicitudes
        </Typography>
      </Stack>
      <TableContainer
        // className="hide-scrollbar_xs"
        className="hide-scrollbar"
        sx={{
          width: "100%",
          height: "300px",
          boxShadow: `2px 2px 7px ${theme.palette.grey[900]}`,
        }}
      >
        <MuiTable
          stickyHeader
          sx={{ minWidth: 650, bgcolor: "background.default" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {Object.keys(state[0] || SOLICITUD).map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ textTransform: "capitalize" }}
                >
                  {column}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                completar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence initial={false}>
              {!state?.length ? (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {loading ? (
                    <TableCell
                      align="center"
                      colSpan={6}
                      sx={{ color: "error.main" }}
                    >
                      <CircularProgress color="primary" size={25} />
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      colSpan={6}
                      sx={{ color: "error.main" }}
                    >
                      No existen solicitudes
                    </TableCell>
                  )}
                </TableRow>
              ) : (
                state?.map(solicitud => (
                  <TableRow
                    component={motion.tr}
                    layout
                    key={solicitud.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                    exit={{ opacity: 0 }}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <Solicitud solicitud={solicitud} />
                    {solicitud.estado === "pendiente" && (
                      <TableCell align="center">
                        <CheckIcon
                          fontSize="medium"
                          htmlColor={theme.palette.primary.main}
                          onClick={() => onSetSolicitud(solicitud.id)}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Stack>
  );
};

interface SolicitudProps {
  solicitud: ISolicitud;
}

const Solicitud = (props: SolicitudProps): JSX.Element => {
  return (
    <>
      {Object.values(props.solicitud).map((cell: string, index) => (
        <TableCell align="center" key={index}>
          {cell}
        </TableCell>
      ))}
    </>
  );
};

export default Solicitudes;
