import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import ICliente from "../interfaces/Cliente";
import IUsuario from "../interfaces/Usuario";
import Form from "./Form";

interface EditDrawerProps<T> {
  editing: Omit<T, "password">;
  open: boolean;
  type: "usuario" | "cliente";
  handleClose: () => void;
  onConfirm: (row: T) => void;
  creating?: boolean;
}

const EditDrawer = <T extends Partial<IUsuario & ICliente>>(
  props: EditDrawerProps<T>
): JSX.Element => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer anchor="right" open={props.open} onClose={props.handleClose}>
      <Form
        type={props.type}
        creating={props.creating}
        onConfirm={props.onConfirm}
        width={isSmallScreen ? "80vw" : "40vw"}
        editing={props.editing}
        handleClose={props.handleClose}
      />
    </Drawer>
  );
};

export default EditDrawer;
