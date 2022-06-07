import Table from "./Table";
import { IUsuario } from "../interfaces/Usuario";
import React from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth/index";
import useUsuarios from "../hooks/useUsuarios";
import { useAppContext } from "../context/index";
import { debounce } from "lodash";

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

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const debounceOnChange = debounce(onChangeSearch, 300);
  return (
    <Table
      title="Usuarios"
      type="usuario"
      fullWidth
      rows={filtroUsuarios ?? []}
      search={search}
      setSearch={setSearch}
      onChangeSearch={debounceOnChange}
      initialSelected={initialSelected}
      onCreate={createUser}
      onUpdate={updateUser}
      onDelete={deleteUser}
    />
  );
};

export default Usuarios;
