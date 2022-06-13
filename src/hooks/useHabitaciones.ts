import { EstadoHabitacion } from "./../interfaces/Habitacion";
import React from "react";
import ICliente from "../interfaces/Cliente";
import { useAuth } from "../context/auth/index";
import useAxios from "./useAxios";
import toast from "react-hot-toast";
import IHabitacion from "../interfaces/Habitacion";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";
import IHabitacionBody from "../interfaces/api/HabitacionBody";
import { useAppContext } from "../context/index";

const useHabitaciones = () => {
  const [state, setState] = React.useState<IHabitacion[]>();
  const [habitacionesLeft, setHabitacionesLeft] = React.useState<number[]>([]);

  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();

  const [{ data: habitaciones, loading, error }] = useAxios<IHabitacion[]>({
    url: "/habitaciones/",
    headers,
  });

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postHabitacion,
  ] = useAxios<{ detail: string }, IHabitacionBody>(
    {
      url: "/habitacion/",
      method: "POST",
      // headers,
    },
    { manual: true }
  );

  const [
    { data: patchResponse, loading: patchLoading, error: patchError },
    patchHabitacion,
  ] = useAxios<IHabitacion, { estado: EstadoHabitacion } | { precio: number }>(
    {
      method: "PATCH",
      headers,
    },
    { manual: true, autoCancel: false }
  );

  // const [
  //   { data: deleteResponse, loading: deleteLoading, error: deleteError },
  //   deleteClient,
  // ] = useAxios<{ detail: string }, Partial<IHabitacion>>(
  //   {
  //     url: "/cliente/",
  //     method: "DELETE",
  //     headers,
  //   },
  //   { manual: true }
  // );

  const createHabitacion = (tipo: Omit<NombreTipoHabitacion, "todas">) => {
    openBackdrop();
    postHabitacion({
      data: {
        no_habitacion:
          Math.max(...(state?.map(p => p.no_habitacion) || [0])) + 1,
        tipo,
        estado: "disponible",
      },
    });
  };

  const cambiarEstadoHabitacion = (id: number, estado: EstadoHabitacion) => {
    patchHabitacion({
      url: `/habitacion/${id}/`,
      data: {
        estado,
      },
    });
  };

  const cambiarEstadosHabitaciones = (habitaciones: number[]) => {
    setHabitacionesLeft(habitaciones);
  };

  React.useEffect(() => {
    if (!habitacionesLeft.length) return;
    cambiarEstadoHabitacion(habitacionesLeft[0], "reservada");
    setHabitacionesLeft(habitacionesLeft.slice(1));
  }, [habitacionesLeft]);

  React.useEffect(() => {
    if (!habitaciones?.length) return;
    setState(habitaciones);
  }, [habitaciones]);

  React.useEffect(() => {
    if (!postResponse) return;
    closeBackdrop();
    toast.success(postResponse.detail);
    setState(prev => [
      {
        no_habitacion:
          Math.max(...(prev?.map(p => p.no_habitacion) || [0])) + 1,
        tipo: {
          tipo: "sencilla",
          descripcion: "Sencilla",
          precio: 0,
        },
        estado: "disponible",
      },
      ...prev!,
    ]);
  }, [postResponse]);

  return {
    habitaciones: state,
    createHabitacion,
    loading,
    cambiarEstadoHabitacion,
    cambiarEstadosHabitaciones,
    // updateClient,
    // deleteClient: deleteClientById,
  };
};
export default useHabitaciones;
