import React from "react";
import { useAuth } from "../context/auth/index";
import useAxios from "./useAxios";
import IServicioIncluido from "../interfaces/ServicioIncluido";
import { CodServicio } from "../interfaces/Servicio";
import ServicioIncluidoBody from "../interfaces/api/ServicioIncluidoBody";
import { useAppContext } from "../context/index";
import toast from "react-hot-toast";

const useServicios = () => {
  const { user } = useAuth();
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [
    { data: serviciosIncluidos, loading: serviciosIncluidosLoading, error },
    getServiciosIncluidos,
  ] = useAxios<IServicioIncluido[]>(
    {
      headers,
    },
    { manual: true }
  );

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postServicioIncluido,
  ] = useAxios<
    { detail: string; servicio_incluido: IServicioIncluido },
    ServicioIncluidoBody
  >(
    {
      url: "/servicioincluido/",
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const fetchServiciosIncluidos = (no_factura: number) => {
    getServiciosIncluidos({
      url: `/serviciosfactura/?factura=${no_factura}`,
    });
  };

  const createServicioIncluido = (
    no_factura: number,
    cod_servicio: CodServicio
  ) => {
    openBackdrop();
    postServicioIncluido({
      data: {
        factura: no_factura,
        servicio: cod_servicio,
        fecha_servicio: new Date(),
      },
    });
  };

  React.useEffect(() => {
    if (!postResponse) return;
    console.log(postResponse);
    closeBackdrop();
    toast.success("Servicio incluido exitosamente!");
  }, [postResponse]);

  return {
    createServicioIncluido,
    fetchServiciosIncluidos,
    serviciosIncluidos,
    serviciosIncluidosLoading,
    postResponse,
  };
};

export default useServicios;
