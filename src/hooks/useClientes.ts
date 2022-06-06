import React from "react";
import ICliente from "../interfaces/Cliente";
import { useAuth } from "../context/auth/index";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const useClientes = () => {
  const [state, setState] = React.useState<ICliente[]>();
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [{ data: clientes, loading, error }] = useAxios<ICliente[]>({
    url: "/clientes/",
    headers,
  });

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postClient,
  ] = useAxios<{ detail: string }, ICliente>(
    {
      url: "/cliente/",
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const [
    { data: patchResponse, loading: patchLoading, error: patchError },
    patchClient,
  ] = useAxios<ICliente, Partial<ICliente>>(
    {
      url: "/cliente/",
      method: "PATCH",
      headers,
    },
    { manual: true }
  );
  const [
    { data: deleteResponse, loading: deleteLoading, error: deleteError },
    deleteClient,
  ] = useAxios<{ detail: string }, Partial<ICliente>>(
    {
      url: "/cliente/",
      method: "DELETE",
      headers,
    },
    { manual: true }
  );

  const createClient = (cliente: ICliente) => {
    postClient({
      data: cliente,
    });
  };
  const updateClient = (cliente: Partial<ICliente>) => {
    patchClient({
      data: cliente,
      url: `/client/${cliente.no_identificacion}/`,
    });
  };
  const deleteClientById = (id: string) => {
    patchClient({
      url: `/client/${id}`,
    });
  };

  React.useEffect(() => {
    if (!clientes?.length) return;
    setState(clientes);
  }, [clientes]);

  React.useEffect(() => {
    if (!postResponse) return;
    toast.success(postResponse.detail);
    setState(prev => [
      {
        no_identificacion: "0",
        nombre: "hard",
        telefono: "123456789",
        correo: "hard@hard.com",
      },
      ...prev!,
    ]);
  }, [postResponse]);

  return {
    clientes: state,
    createClient,
    updateClient,
    deleteClient: deleteClientById,
  };
};
export default useClientes;
