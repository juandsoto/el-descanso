import React from "react";
import ICliente from "../../interfaces/Cliente";
import IHabitacion from "../../interfaces/Habitacion";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export type additionalReserva = {
  fecha_entrada?: Date;
  numero_noches?: number;
};

export interface Reserva {
  cliente: ICliente | null;
  habitaciones: (IHabitacion & additionalReserva)[];
}
interface IReservaContext {
  reserva: Reserva;
  setReserva: React.Dispatch<React.SetStateAction<Reserva>>;
  reset: () => void;
}

const initialReserva: Reserva = {
  cliente: null,
  habitaciones: [],
};

const ReservaContext = React.createContext<IReservaContext>({
  reserva: initialReserva,
  setReserva: () => {},
  reset: () => {},
} as IReservaContext);

export const ReservaProvider = ({ children }: Props): JSX.Element => {
  const [reserva, setReserva] = React.useState<Reserva>(initialReserva);

  const reset = () => {
    setReserva(initialReserva);
  };

  return (
    <ReservaContext.Provider value={{ reserva: reserva!, setReserva, reset }}>
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = () => {
  return React.useContext(ReservaContext);
};
