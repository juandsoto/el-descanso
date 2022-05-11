import Table from "./Table";
import { IUsuario } from "../interfaces/Usuario";
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
  const [usuarios, setUsuarios] = React.useState<IUsuario[]>(rows);

  // React.useEffect(() => {
  // 	/**
  // 	 * Fetch usuarios
  // 	 */
  // },[])
  const [search, setSearch] = React.useState<string>("");

  const filtroUsuarios = React.useMemo(
    () =>
      usuarios.filter(usuario => {
        const inNombre = usuario.nombre
          .toLowerCase()
          .includes(search.toLowerCase());
        const inId = usuario.id.toLowerCase().includes(search.toLowerCase());
        const inTelefono = usuario.telefono
          .toLowerCase()
          .includes(search.toLowerCase());
        const inRol = usuario.rol.toLowerCase().includes(search.toLowerCase());
        const inUsuario = usuario.usuario
          .toLowerCase()
          .includes(search.toLowerCase());
        return inNombre || inId || inTelefono || inRol || inUsuario;
      }),
    [search]
  );

  const onChangeSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );

  return (
    <Table
      title="Usuarios"
      type="usuario"
      fullWidth
      rows={filtroUsuarios}
      search={search}
      setSearch={setSearch}
      onChangeSearch={onChangeSearch}
      initialSelected={initialSelected}
    />
  );
};

export default Usuarios;
