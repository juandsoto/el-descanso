import React from "react";
import IFactura from "../interfaces/Factura";
import IFacturaPostResponse from "../interfaces/api/FacturaPostResponse";
import { useAuth } from "../context/auth/index";
import FacturaBody from "../interfaces/api/FacturaBody";
import useAxios from "./useAxios";
import ICheckout from "../interfaces/Checkout";
import { useAppContext } from "../context/index";
import toast from "react-hot-toast";
import moment from "moment";
import useHabitaciones from "./useHabitaciones";

const useFacturas = () => {
  const { user } = useAuth();
  const { cambiarEstadoHabitacion } = useHabitaciones();
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [
    { data: getResponse, loading: getLoading, error: getError },
    getFactura,
  ] = useAxios<IFactura>(
    {
      headers,
    },
    { manual: true }
  );

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postFactura,
  ] = useAxios<IFacturaPostResponse, FacturaBody>(
    {
      url: "/factura/",
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const [
    { data: checkoutResponse, loading: checkoutLoading, error: checkoutError },
    postCheckout,
  ] = useAxios<ICheckout, ICheckout>(
    {
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const [
    { data: patchResponse, loading: patchLoading, error: patchError },
    patchFactura,
  ] = useAxios<IFactura, { checkout: number; precio_total?: number }>(
    {
      method: "PATCH",
      headers,
    },
    { manual: true }
  );

  const fetchFactura = (no_reserva: number) => {
    getFactura({
      url: `/facturafiltro/?no_factura=${no_reserva}`,
    });
  };

  const createFactura = (
    factura: Omit<FacturaBody, "fecha_factura" | "checkout">
  ) => {
    openBackdrop();
    postFactura({
      data: {
        ...factura,
        fecha_factura: new Date(),
        checkout: null,
      },
    });
  };

  const checkout = (
    no_factura: number,
    no_habitacion: number,
    checkout: Omit<ICheckout, "fecha_salida">,
    isTimeout: () => boolean | undefined,
    recargo: number
  ) => {
    openBackdrop();
    postCheckout({
      url: "/checkout/",
      data: {
        ...checkout,
        fecha_salida: new Date(),
      },
    });
    if (isTimeout()) {
      patchFactura({
        url: `/factura/${no_factura}/`,
        data: {
          checkout: checkout.no_checkout,
          precio_total: recargo,
        },
      });
    } else {
      patchFactura({
        url: `/factura/${no_factura}/`,
        data: {
          checkout: checkout.no_checkout,
        },
      });
    }
    cambiarEstadoHabitacion(no_habitacion, "disponible");
  };

  React.useEffect(() => {
    if (!postResponse) return;
    console.log(postResponse);
    closeBackdrop();
    toast.success("Check-in realizado exitosamente!");
  }, [postResponse]);

  React.useEffect(() => {
    if (!checkoutResponse) return;
    console.log(checkoutResponse);
    closeBackdrop();
    // toast.success("Check-in realizado exitosamente!");
  }, [checkoutResponse]);

  return {
    factura: getResponse,
    loading: getLoading,
    error: getError,
    createFactura,
    fetchFactura,
    checkout,
  };
};

export default useFacturas;
