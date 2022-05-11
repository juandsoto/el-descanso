import React from "react";
import ICliente from "../interfaces/Cliente";
import Table from "./Table";

const rows: ICliente[] = [
  {
    id: "1006494084",
    nombre: "pepito",
    telefono: "123456789",
    correo: "pepito@test.com",
  },
  {
    id: "2006494084",
    nombre: "juanito",
    telefono: "123456789",
    correo: "juanito@test.com",
  },
  {
    id: "3006494084",
    nombre: "rosa",
    telefono: "123456789",
    correo: "rosa@test.com",
  },
  {
    id: "4006494084",
    nombre: "jorge",
    telefono: "123456789",
    correo: "jorge@test.com",
  },
  {
    id: "5006494084",
    nombre: "carmen",
    telefono: "123456789",
    correo: "carmen@test.com",
  },
  {
    id: "6006494084",
    nombre: "danilo",
    telefono: "123456789",
    correo: "danilo@test.com",
  },
  {
    id: "7006494084",
    nombre: "alberto",
    telefono: "123456789",
    correo: "alberto@test.com",
  },
  {
    id: "8006494084",
    nombre: "valeria",
    telefono: "123456789",
    correo: "valeria@test.com",
  },
];

const initialSelected: ICliente = {
  id: "",
  nombre: "",
  telefono: "",
  correo: "",
};

const Clientes = (): JSX.Element => {
  const [clientes, setClientes] = React.useState<ICliente[]>(rows);
  const [search, setSearch] = React.useState<string>("");

  const filtroClientes = React.useMemo(
    () =>
      clientes.filter(cliente => {
        const inNombre = cliente.nombre
          .toLowerCase()
          .includes(search.toLowerCase());
        const inId = cliente.id.toLowerCase().includes(search.toLowerCase());
        const inTelefono = cliente.telefono
          .toLowerCase()
          .includes(search.toLowerCase());
        const inCorreo = cliente.correo
          .toLowerCase()
          .includes(search.toLowerCase());
        return inNombre || inId || inTelefono || inCorreo;
      }),
    [search]
  );

  const onChangeSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );

  // React.useEffect(() => {
  // 	/**
  // 	 * Fetch clientes
  // 	 */
  // },[])

  return (
    <Table
      title="Clientes"
      type="cliente"
      fullWidth
      rows={filtroClientes}
      search={search}
      setSearch={setSearch}
      onChangeSearch={onChangeSearch}
      initialSelected={initialSelected}
    />
  );
};

export default Clientes;
