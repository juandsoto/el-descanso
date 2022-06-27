interface IClienteHabitual {
  id: string;
  tipo: "persona natural" | "cliente corporativo";
  descuento: number;
}

export default interface ICliente {
  no_identificacion: string;
  nombre: string;
  telefono: string;
  correo: string;
}
