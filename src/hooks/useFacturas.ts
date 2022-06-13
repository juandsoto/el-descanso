import React from "react";
import IFactura from "../interfaces/Factura";
import IFacturaPostResponse from "../interfaces/api/FacturaPostResponse";
import { useAuth } from "../context/auth/index";
import FacturaBody from "../interfaces/api/FacturaBody";
import useAxios from "./useAxios";

const useFacturas = () => {
  const [state, setState] = React.useState<IFactura[]>();
  const [postFacturas, setPostFacturas] = React.useState<
    IFacturaPostResponse[]
  >([]);
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

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

  const createFactura = (
    factura: Omit<FacturaBody, "fecha_factura" | "checkout">
  ) => {
    postFactura({
      data: {
        ...factura,
        fecha_factura: new Date(),
        checkout: null,
      },
    });
  };

  React.useEffect(() => {
    postResponse && console.log(postResponse);
  }, [postResponse]);

  return {
    createFactura,
  };
};

export default useFacturas;
