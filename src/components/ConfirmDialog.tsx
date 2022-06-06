import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IUsuario } from "../interfaces/Usuario";
import ICliente from "../interfaces/Cliente";
import React from "react";

interface DialogInfo<T> {
  title: string;
  item: Partial<Omit<T, "password">>;
  description: string;
  onCancel: () => void;
  onConfirm: (row: Partial<Omit<T, "password">>) => void;
}
interface ConfirmDialogProps<T> {
  open: boolean;
  handleClose: () => void;
  dialogInfo: DialogInfo<T>;
}

const ConfirmDialog = <T extends Partial<IUsuario & ICliente>>(
  props: ConfirmDialogProps<T>
): JSX.Element => {
  const theme = useTheme();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.dialogInfo.onConfirm(props.dialogInfo.item);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby={`confirm-dialog-${props.dialogInfo.title}`}
    >
      <Box sx={{ bgcolor: "background.default" }}>
        <DialogTitle id={`confirm-dialog-${props.dialogInfo.title}`}>
          {props.dialogInfo.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogInfo.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box onSubmit={onSubmit} component="form">
            <Button onClick={props.dialogInfo.onCancel}>Cancelar</Button>
            <Button type="submit" color="primary">
              Aceptar
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
