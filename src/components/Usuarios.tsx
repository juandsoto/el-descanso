import Table from "./Table";
import { IUsuario } from "../interfaces/Usuario";
import React from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth/index";
import useUsuarios from "../hooks/useUsuarios";
import { useAppContext } from "../context/index";

const initialSelected: IUsuario = {
  id: "",
  nombre: "",
  username: "",
  password: "",
  rol: "",
  telefono: "",
};

const Usuarios = (): JSX.Element => {
  const { usuarios, createUser, updateUser, deleteUser } = useUsuarios();
  const [search, setSearch] = React.useState<string>("");
  const filtroUsuarios = React.useMemo(
    () =>
      usuarios?.filter(usuario => {
        const inNombre = usuario.nombre
          .toLowerCase()
          .includes(search.toLowerCase());
        const inId = usuario.id.startsWith(search);
        const inRol = usuario.rol
          .toLowerCase()
          .startsWith(search.toLowerCase());
        const inUsuario = usuario.username
          .toLowerCase()
          .startsWith(search.toLowerCase());
        return inNombre || inId || inRol || inUsuario;
      }),
    [usuarios, search]
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
      rows={filtroUsuarios ?? []}
      search={search}
      setSearch={setSearch}
      onChangeSearch={onChangeSearch}
      initialSelected={initialSelected}
      onCreate={createUser}
      onUpdate={updateUser}
      onDelete={deleteUser}
    />
  );
};

export default Usuarios;
