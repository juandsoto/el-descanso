import React from "react";
import useClientes from "../hooks/useClientes";
import ICliente from "../interfaces/Cliente";
import Table from "./Table";

const initialSelected: ICliente = {
  no_identificacion: "",
  nombre: "",
  telefono: "",
  correo: "",
};

interface ClientesProps {}

const Clientes = (props: ClientesProps): JSX.Element => {
  const { clientes, createClient, updateClient, deleteClient } = useClientes();
  const [search, setSearch] = React.useState<string>("");

  const filtroClientes = React.useMemo(
    () =>
      clientes?.filter(cliente => {
        const inNombre = cliente.nombre
          .toLowerCase()
          .includes(search.toLowerCase());
        const inId = cliente.no_identificacion.startsWith(search);
        const inCorreo = cliente.correo
          .toLowerCase()
          .startsWith(search.toLowerCase());
        return inNombre || inId || inCorreo;
      }),
    [clientes, search]
  );

  const onChangeSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );

  return (
    <Table
      title="Clientes"
      type="cliente"
      fullWidth
      rows={filtroClientes ?? []}
      search={search}
      setSearch={setSearch}
      onChangeSearch={onChangeSearch}
      initialSelected={initialSelected}
      onCreate={createClient}
      onUpdate={updateClient}
      onDelete={deleteClient}
    />
  );
};

export default Clientes;
