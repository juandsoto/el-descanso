import Table from "./Table";
import { IUsuario } from "../interfaces/Usuario";
import { useTheme } from "@mui/material";
import React from "react";

const rows: IUsuario[] = [
  {
    id: "1",
    telefono: "123456789",
    usuario: "juan",
    nombre: "juan david",
    contraseña: "recepcionista",
    rol: "recepcionista",
  },
  {
    id: "2",
    telefono: "123456789",
    usuario: "nata",
    nombre: "natalia",
    contraseña: "gerente",
    rol: "gerente",
  },
  {
    id: "3",
    telefono: "123456789",
    usuario: "mauricio",
    nombre: "mauricio",
    contraseña: "administrador",
    rol: "administrador",
  },
  {
    id: "4",
    telefono: "123456789",
    usuario: "adrian",
    nombre: "adrian",
    contraseña: "cajero",
    rol: "cajero",
  },
  {
    id: "5",
    telefono: "123456789",
    usuario: "andres",
    nombre: "andres",
    contraseña: "cajero2",
    rol: "cajero",
  },
];

const initialSelected: IUsuario = {
  id: "",
  nombre: "",
  usuario: "",
  contraseña: "",
  rol: "",
  telefono: "",
};

const Usuarios = (): JSX.Element => {
  // const [usuarios, setUsuarios] = React.useState<IUsuario[]>();

  // React.useEffect(() => {
  // 	/**
  // 	 * Fetch usuarios
  // 	 */
  // },[])

  return (
    <Table
      title="Usuarios"
      fullWidth
      rows={rows}
      initialSelected={initialSelected}
    ></Table>
  );
};

export default Usuarios;
