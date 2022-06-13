import React from "react";
import useClientes from "../hooks/useClientes";
import ICliente from "../interfaces/Cliente";
import Table from "./Table";
import { debounce } from "lodash";

const initialSelected: ICliente = {
  no_identificacion: "",
  nombre: "",
  telefono: "",
  correo: "",
};

const Clientes = (): JSX.Element => {
  const {
    clientes: data,
    createClient,
    updateClient,
    deleteClient,
  } = useClientes();
  const [clientes, setClientes] = React.useState<ICliente[]>([]);
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

  const onCreate = (cliente: ICliente) => {
    setClientes(prev => [cliente, ...prev]);
    createClient(cliente);
  };

  const onUpdate = (cliente: ICliente) => {
    setClientes(prev =>
      prev.map(c =>
        c.no_identificacion === cliente.no_identificacion ? cliente : c
      )
    );
    updateClient(cliente);
  };

  const onDelete = (id: string) => {
    setClientes(prev => prev.filter(c => c.no_identificacion !== id));
    deleteClient(id);
  };

  React.useEffect(() => {
    data && setClientes(data);
  }, [data]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const debounceOnChange = debounce(onChangeSearch, 300);

  return (
    <Table
      title="Clientes"
      type="cliente"
      fullWidth
      rows={filtroClientes ?? []}
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

export default Clientes;
