import Table from "./Table";
import IUsuario from "../interfaces/Usuario";
import React from "react";
import useUsuarios from "../hooks/useUsuarios";
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
  const { usuarios: data, createUser, updateUser, deleteUser } = useUsuarios();
  const [usuarios, setUsuarios] = React.useState<Omit<IUsuario, "password">[]>(
    []
  );
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

  const onCreate = (data: IUsuario) => {
    const { password, ...usuario } = data;
    setUsuarios(prev => [usuario, ...prev]);
    createUser(data);
  };

  const onUpdate = (data: IUsuario) => {
    const { password, ...usuario } = data;
    setUsuarios(prev => prev.map(u => (u.id === usuario.id ? usuario : u)));
    if (password.length) {
      updateUser(data);
      return;
    }
    updateUser(usuario);
  };

  const onDelete = (id: string) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
    deleteUser(id);
  };

  React.useEffect(() => {
    data && setUsuarios(data);
  }, [data]);

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
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
};

export default Usuarios;
