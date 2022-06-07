import React from "react";
import IReserva from "../interfaces/Reserva";
import { useAuth } from "../context/auth/index";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import IReservaBody from "../interfaces/api/ReservaBody";

const useReservas = () => {
  const [state, setState] = React.useState<IReserva[]>();
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  // const [{ data: reservas, loading, error }] = useAxios<IReserva[]>({
  //   url: "/reservas/",
  //   headers,
  // });

  const [
    {
      data: reservasById,
      loading: reservasByIdLoading,
      error: reservasByIdError,
    },
    getById,
  ] = useAxios<IReserva>(
    {
      method: "GET",
      headers,
    },
    { manual: true }
  );
  const [
    {
      data: reservasByClientId,
      loading: reservasByClientIdLoading,
      error: reservasByClientIdError,
    },
    getByClientId,
  ] = useAxios<IReserva[]>(
    {
      method: "GET",
      headers,
    },
    { manual: true }
  );

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postReserva,
  ] = useAxios<{ detail: string }, IReservaBody>(
    {
      url: "/reserva/",
      method: "POST",
      headers,
    },
    { manual: true, autoCancel: false }
  );

  // const [
  //   { data: patchResponse, loading: patchLoading, error: patchError },
  //   patchClient,
  // ] = useAxios<IReserva, Partial<IReserva>>(
  //   {
  //     url: "/cliente/",
  //     method: "PATCH",
  //     headers,
  //   },
  //   { manual: true }
  // );
  // const [
  //   { data: deleteResponse, loading: deleteLoading, error: deleteError },
  //   deleteClient,
  // ] = useAxios<{ detail: string }, Partial<IReserva>>(
  //   {
  //     url: "/cliente/",
  //     method: "DELETE",
  //     headers,
  //   },
  //   { manual: true }
  // );

  const getReservasById = (id: number) => {
    getById({
      url: `/reserva/${id}/`,
    });
  };
  const getReservasByClientId = (id: string) => {
    getByClientId({
      url: `/reservacliente/?cliente=${id}`,
    });
  };
  const createReserva = (reserva: IReservaBody) => {
    postReserva({
      data: reserva,
    });
  };
  // const updateClient = (cliente: Partial<IReserva>) => {
  //   patchClient({
  //     data: cliente,
  //     url: `/client/${cliente.no_identificacion}/`,
  //   });
  // };
  // const deleteClientById = (id: string) => {
  //   patchClient({
  //     url: `/client/${id}`,
  //   });
  // };

  React.useEffect(() => {
    if (!reservasById) return;
    setState([reservasById]);
  }, [reservasById]);

  React.useEffect(() => {
    if (!reservasByClientId?.length) return;
    setState(reservasByClientId);
  }, [reservasByClientId]);

  React.useEffect(() => {
    if (!reservasByClientIdError) return;
    toast.error(
      `No se encontró el cliente con identificación ${
        reservasByClientId![0].cliente?.no_identificacion
      }`
    );
  }, [reservasByClientIdError]);

  React.useEffect(() => {
    if (!postResponse) return;
    toast.success("Reserva creada exitosamente!");
  }, [postResponse]);

  return {
    reservas: state,
    reservasByClientIdLoading,
    getReservasById,
    getReservasByClientId,
    createReserva,
    // updateClient,
    // deleteClient: deleteClientById,
  };
};
export default useReservas;
