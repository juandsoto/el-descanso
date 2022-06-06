import { availableServices } from "../data";
import IAvailableServices from "../interfaces/AvailableServices";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
};

export const isServiceAvailable = (
  tipoHabitacion: Omit<NombreTipoHabitacion, "todas">,
  servicio: string
) => {
  const isAvailable = availableServices.some(
    as =>
      as.habitacion.toLowerCase() === tipoHabitacion.toLowerCase() &&
      as[servicio as keyof IAvailableServices]
  );
  return isAvailable;
};

export const getMonth = (month: string): string => {
  switch (month) {
    case "01":
      return "Enero";
    case "02":
      return "Febrero";
    case "03":
      return "Marzo";
    case "04":
      return "Abril";
    case "05":
      return "Mayo";
    case "06":
      return "Junio";
    case "07":
      return "Julio";
    case "08":
      return "Agosto";
    case "09":
      return "Septiembre";
    case "10":
      return "Octubre";
    case "11":
      return "Noviembre";
    case "12":
      return "Diciembre";
    default:
      return "Enero";
  }
};
