import React from "react";
import ICliente from "../interfaces/Cliente";
import { useAuth } from "../context/auth/index";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/index";
import IClienteHabitual from "../interfaces/ClienteHabitual";

type HabitualId = "6" | "7";

const useClientes = () => {
  const { user } = useAuth();
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [{ data: natural, loading: loadingNatural }] =
    useAxios<IClienteHabitual>({
      url: "/clientehabitual/6/",
      headers,
    });

  const [{ data: corporativo, loading: loadingCorporativo }] =
    useAxios<IClienteHabitual>({
      url: "/clientehabitual/7/",
      headers,
    });

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

  const [{ data: updatedDescuento }, patchDescuento] = useAxios<
    any,
    { descuento: number }
  >(
    {
      headers,
      method: "PATCH",
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
      url: `/cliente/${cliente.no_identificacion}/`,
    });
  };
  const deleteClientById = (id: string) => {
    patchClient({
      url: `/cliente/${id}`,
    });
  };

  const updateDescuento = (id: HabitualId, descuento: number) => {
    openBackdrop();
    patchDescuento({
      url: `/clientehabitual/${id}/`,
      data: {
        descuento,
      },
    });
  };

  React.useEffect(() => {
    if (!postResponse) return;
    toast.success(postResponse.detail);
  }, [postResponse]);

  React.useEffect(() => {
    if (!patchResponse) return;
    toast.success("Cliente actualizado con éxito!");
  }, [patchResponse]);

  React.useEffect(() => {
    if (!deleteResponse) return;
    toast.success("Cliente eliminado con éxito!");
  }, [deleteResponse]);

  React.useEffect(() => {
    if (!updatedDescuento) return;
    closeBackdrop();
    toast.success("Descuento actualizado con éxito!");
  }, [updatedDescuento]);

  return {
    clientes,
    createClient,
    updateClient,
    updateDescuento,
    natural,
    loadingHabitual: loadingNatural || loadingCorporativo,
    corporativo,
    deleteClient: deleteClientById,
  };
};
export default useClientes;
