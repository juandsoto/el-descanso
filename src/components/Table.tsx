import { Box, Button } from "@mui/material";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IUsuario } from "../interfaces/Usuario";
import React from "react";
import EditDrawer from "./EditDrawer";
import ConfirmDialog from "./ConfirmDialog";
import { useTheme } from "@mui/material/styles";

interface TableProps<T> {
  title: string;
  rows: T[];
  fullWidth?: boolean;
  initialSelected: T;
}

const Table = <T extends IUsuario>(props: TableProps<T>): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<T>(props.initialSelected);
  const theme = useTheme();
  return (
    <>
      <Box
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
          {props.title}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: `${props.fullWidth ? "95%" : "80%"}`,
            boxShadow: "2px 2px 7px #666",
          }}
        >
          <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(props.rows[0]).map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {column}
                  </TableCell>
                ))}
                <TableCell align="center">Editar</TableCell>
                <TableCell align="center">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {Object.values(row).map((cell: string, index) => {
                      return (
                        <TableCell align="center" key={index}>
                          {cell}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setSelected(row);
                          setIsEditing(true);
                        }}
                      >
                        editar
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setIsDeleting(true)}
                      >
                        eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
      <EditDrawer
        handleClose={() => setIsEditing(false)}
        open={isEditing}
        editing={selected}
      />
      <ConfirmDialog
        open={isDeleting}
        handleClose={() => setIsDeleting(false)}
        dialogInfo={{
          title: "Eliminar usuario",
          description: "¿Está seguro que desea eliminar este usuario?",
          onCancel: () => setIsDeleting(false),
          onConfirm: () => {
            alert("usuario eliminado satisfactoriamente");
            setIsDeleting(false);
          },
        }}
      />
    </>
  );
};

export default Table;
