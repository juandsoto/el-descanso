import React from "react";
import IReserva from "../interfaces/Reserva";
import { useAuth } from "../context/auth/index";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import IReservaBody from "../interfaces/api/ReservaBody";
import { useAppContext } from "../context/index";
import IReservaPostResponse, {
  ReservaResponse,
} from "../interfaces/api/ReservaPostResponse";

const useReservas = () => {
  const [state, setState] = React.useState<IReserva[]>();
  const [postReservas, setPostReservas] = React.useState<ReservaResponse[]>([]);
  const [reservasLeft, setReservasLeft] = React.useState<IReservaBody[]>([]);
  const { user } = useAuth();
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

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
  ] = useAxios<IReservaPostResponse, IReservaBody>(
    {
      url: "/reserva/",
      method: "POST",
      headers,
    },
    { manual: true, autoCancel: false }
  );

  const [
    { data: patchResponse, loading: patchLoading, error: patchError },
    patchReserva,
  ] = useAxios<IReserva, { cancelada: boolean }>(
    {
      method: "PATCH",
      headers,
    },
    { manual: true }
  );

  const reset = () => {
    setState([]);
    setPostReservas([]);
  };

  const getReservasById = (id: number) => {
    reset();
    getById({
      url: `/reserva/${id}/`,
    });
  };
  const getReservasByClientId = (id: string) => {
    reset();
    getByClientId({
      url: `/reservacliente/?cliente=${id}`,
    });
  };
  const createReserva = (reserva: IReservaBody) => {
    postReserva({
      data: reserva,
    });
  };
  const createReservas = (reservas: IReservaBody[]) => {
    setReservasLeft(reservas);
  };

  const cancelarReserva = (id: number) => {
    openBackdrop();
    patchReserva({
      url: `/reserva/${id}/`,
      data: {
        cancelada: true,
      },
    });
  };

  const checkinReserva = (id: number) => {};

  React.useEffect(() => {
    if (!reservasLeft.length) return;
    createReserva(reservasLeft[0]);
    setTimeout(() => {
      setReservasLeft(reservasLeft.slice(1));
    }, 1000);
  }, [reservasLeft]);

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
    console.log(postResponse);
    setPostReservas(prev => [...prev, postResponse.reserva]);
    toast.success("Reserva creada exitosamente!");
  }, [postResponse]);

  React.useEffect(() => {
    if (!patchResponse) return;
    console.log(patchResponse);
    closeBackdrop();
    toast.success("Reserva cancelada exitosamente!");
  }, [patchResponse]);

  return {
    reservas: state,
    loading: reservasByIdLoading || reservasByClientIdLoading,
    reset,
    reservasByIdError,
    reservasByClientIdError,
    postReservas,
    reservasByClientIdLoading,
    getReservasById,
    getReservasByClientId,
    createReserva,
    createReservas,
    cancelarReserva,
    checkinReserva,
    // updateClient,
    // deleteClient: deleteClientById,
  };
};
export default useReservas;
