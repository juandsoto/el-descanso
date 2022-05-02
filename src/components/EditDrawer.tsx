import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { IUsuario } from "../interfaces/Usuario";
import Form from "./Form";

interface EditDrawerProps<T> {
  editing: T;
  open: boolean;
  handleClose: () => void;
}

const EditDrawer = <T extends IUsuario>(
  props: EditDrawerProps<T>
): JSX.Element => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer anchor="right" open={props.open} onClose={props.handleClose}>
      <Form
        type="usuario"
        width={isSmallScreen ? "80vw" : "30vw"}
        editing={props.editing}
        handleClose={props.handleClose}
      />
    </Drawer>
  );
};

export default EditDrawer;
