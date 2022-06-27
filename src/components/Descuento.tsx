import React from "react";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { useAuth } from "../context/auth/index";
import EditDialog from "./EditDialog";
import useClientes from "../hooks/useClientes";
import CircularProgress from "@mui/material/CircularProgress";
import { PropaneTank } from "@mui/icons-material";

interface DescuentoProps {
  type: "persona natural" | "cliente corporativo";
}

const Descuento = (props: DescuentoProps): JSX.Element => {
  const { updateDescuento, natural, loadingHabitual, corporativo } =
    useClientes();
  const [value, setValue] = React.useState<number>(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { user } = useAuth();

  React.useEffect(() => {
    if (!natural || !corporativo) return;
    setValue(() =>
      props.type === "persona natural"
        ? natural?.descuento!
        : corporativo?.descuento!
    );
  }, [natural, corporativo]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          component="h3"
          color={
            props.type === "persona natural" ? "primary.main" : "secondary.main"
          }
        >
          Descuento
        </Typography>
        <Typography variant="caption" component="span">
          ofrecido a clientes habituales <br /> ({props.type})
        </Typography>
      </Stack>
      {loadingHabitual ? (
        <CircularProgress
          color={props.type === "persona natural" ? "primary" : "secondary"}
        />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            fontSize: "1.2rem",
            bgcolor:
              props.type === "persona natural"
                ? "primary.main"
                : "secondary.main",
            height: "70px",
            width: "70px",
            borderRadius: "50px",
          }}
        >
          {user.rol === "administrador" ? (
            <>
              <Tooltip title="click para editar">
                <Box
                  component="span"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setOpenDialog(true)}
                >
                  {value}%
                </Box>
              </Tooltip>
              <EditDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                inputType="number"
                inputProps={{ min: 0, max: 100 }}
                dialogInfo={{
                  title: "Editar Descuento",
                  name: "descuento",
                  description: `Cambiar descuento para los clientes habituales`,
                  onCancel: () => setOpenDialog(false),
                  onConfirm: (value: number) => {
                    setValue(value);
                    setOpenDialog(false);
                    const id = props.type === "persona natural" ? "6" : "7";
                    updateDescuento(id, value);
                  },
                }}
              />
            </>
          ) : (
            <Box component="span">{value}%</Box>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Descuento;
