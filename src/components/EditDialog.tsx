import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  InputBaseComponentProps,
} from "@mui/material";
import React from "react";
interface DialogInfo<T> {
  title: string;
  description: string;
  name: string;
  onCancel: () => void;
  onConfirm: (value: T) => void;
}
interface EditDialogProps<T> {
  open: boolean;
  handleClose: () => void;
  inputType: "text" | "number";
  dialogInfo: DialogInfo<T>;
  inputProps?: InputBaseComponentProps;
}

const EditDialog = <T extends number>(
  props: EditDialogProps<T>
): JSX.Element => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(Number(event.target.value)),
    [value]
  );

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.dialogInfo.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogInfo.description}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id={props.dialogInfo.name}
          label={props.dialogInfo.name}
          value={value}
          onChange={handleChange}
          type={props.inputType}
          fullWidth
          variant="standard"
          inputProps={{ ...props.inputProps }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.dialogInfo.onCancel}>Cancelar</Button>
        <Button onClick={() => props.dialogInfo.onConfirm(value as T)}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
