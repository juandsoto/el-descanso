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

interface DialogInfo {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}
interface ConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  dialogInfo: DialogInfo;
}

const ConfirmDialog = (props: ConfirmDialogProps): JSX.Element => {
  const theme = useTheme();

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
          <Button onClick={props.dialogInfo.onCancel}>Cancelar</Button>
          <Button onClick={props.dialogInfo.onConfirm}>Aceptar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
