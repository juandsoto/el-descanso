import React from "react";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/auth/index";
import EditDialog from "./EditDialog";

interface DescuentoProps {
  type: "persona natural" | "cliente corporativo";
}

const Descuento = (props: DescuentoProps): JSX.Element => {
  const [value, setValue] = React.useState<number>(5);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { user } = useAuth();

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
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          fontSize: "1.5rem",
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
                {value.toFixed(2)}%
              </Box>
            </Tooltip>
            <EditDialog
              open={openDialog}
              handleClose={() => setOpenDialog(false)}
              inputType="number"
              dialogInfo={{
                title: "Editar Descuento",
                name: "descuento",
                description: `Cambiar descuento para los clientes habituales`,
                onCancel: () => setOpenDialog(false),
                onConfirm: (value: number) => {
                  setValue(value);
                  setOpenDialog(false);
                },
              }}
            />
          </>
        ) : (
          <Box component="span">{value.toFixed(2)}%</Box>
        )}
      </Stack>
    </Stack>
  );
};

export default Descuento;
