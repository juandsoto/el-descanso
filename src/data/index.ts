import ITipoHabitacion from "../interfaces/TipoHabitacion";
import {
  SencillaImage,
  DobleImage,
  MatrimonialImage,
  SuiteSencillaImage,
  SuitePresidencialImage,
} from "../assets/images";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IHabitacion from "../interfaces/Habitacion";
import IReserva from "../interfaces/Reserva";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const tipoHabitaciones: ITipoHabitacion[] = [
  {
    nombre: "sencilla",
    images: [SencillaImage, DobleImage, MatrimonialImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    precio: 199900,
    services: ["restaurante"],
  },
  {
    nombre: "doble",
    images: [DobleImage, MatrimonialImage, SuiteSencillaImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    precio: 199900,
    services: ["restaurante", "llamadas de larga distancia"],
  },
  {
    nombre: "matrimonial",
    images: [MatrimonialImage, SuiteSencillaImage, SuitePresidencialImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    precio: 199900,
    services: ["restaurante", "llamadas de larga distancia", "lavado"],
  },
  {
    nombre: "suite sencilla",
    images: [SuiteSencillaImage, SuitePresidencialImage, SencillaImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    precio: 199900,
    services: [
      "restaurante",
      "llamadas de larga distancia",
      "lavado",
      "planchado",
    ],
  },
  {
    nombre: "suite presidencial",
    images: [SuitePresidencialImage, SencillaImage, DobleImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    precio: 199900,
    services: [
      "restaurante",
      "llamadas de larga distancia",
      "lavado",
      "planchado",
      "bar",
    ],
  },
];

export const usoDeServiciosLabels = [
  "Restaurante",
  "Llamadas",
  "Lavado",
  "Planchado",
  "Bar",
];

export const usoDeServicios = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Uso de servicios",
      },
    },
  },
  data: {
    labels: usoDeServiciosLabels,
    datasets: [
      {
        label: "numero de reservas en que se usa el servicio",
        data: usoDeServiciosLabels.map(
          (_, index) => index * Math.round(Math.random() * 10)
        ),
        backgroundColor: "rgba(233, 30, 155, 0.5)",
      },
    ],
  },
};

export const diasLabels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

export const ocupacionHotel = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Porcentaje ocupacion hotel - abril",
      },
    },
  },
  data: {
    labels: diasLabels,
    datasets: [
      {
        label: "porcentaje ocupacion de hotel",
        data: diasLabels.map((_, index) => Math.floor(Math.random() * 100)),
        borderColor: "rgba(42, 112, 243, 0.5)",
        backgroundColor: "rgba(42, 112, 243, 0.5)",
      },
    ],
  },
};

export const ventasMensuales = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Ventas mensuales - abril`,
      },
    },
  },
  data: {
    labels: diasLabels,
    datasets: [
      {
        label: "Ventas",
        data: diasLabels.map((_, index) => index * Math.random() * 10),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  },
};

export const habitaciones: IHabitacion[] = [
  {
    no_habitacion: 1,
    estado: "disponible",
    tipo: "sencilla",
    precio: 150000,
  },
  {
    no_habitacion: 2,
    estado: "reservada",
    tipo: "doble",
    precio: 200000,
  },
  {
    no_habitacion: 3,
    estado: "ocupada",
    tipo: "doble",
    precio: 200000,
  },
  {
    no_habitacion: 4,
    estado: "disponible",
    tipo: "matrimonial",
    precio: 250000,
  },
  {
    no_habitacion: 5,
    estado: "disponible",
    tipo: "matrimonial",
    precio: 250000,
  },
  {
    no_habitacion: 6,
    estado: "reservada",
    tipo: "suite sencilla",
    precio: 300000,
  },
  {
    no_habitacion: 7,
    estado: "disponible",
    tipo: "suite presidencial",
    precio: 350000,
  },
  {
    no_habitacion: 9,
    estado: "disponible",
    tipo: "suite presidencial",
    precio: 350000,
  },
  {
    no_habitacion: 10,
    estado: "disponible",
    tipo: "suite presidencial",
    precio: 350000,
  },
  {
    no_habitacion: 11,
    estado: "disponible",
    tipo: "suite presidencial",
    precio: 350000,
  },
  {
    no_habitacion: 12,
    estado: "disponible",
    tipo: "suite presidencial",
    precio: 350000,
  },
  {
    no_habitacion: 8,
    estado: "ocupada",
    tipo: "matrimonial",
    precio: 250000,
  },
];

export const hardReservas: IReserva[] = [
  {
    no_reserva: "1",
    fecha_entrada: "2022-05-26T07:34",
    numero_noches: 3,
    cliente: {
      id: "1",
      nombre: "juan",
      correo: "juan@test.com",
      telefono: "123456789",
    },
    habitacion: {
      no_habitacion: 1,
      precio: 200000,
      estado: "reservada",
      tipo: "sencilla",
    },
  },
  {
    no_reserva: "2",
    fecha_entrada: "2022-05-26T07:34",
    numero_noches: 4,
    cliente: {
      id: "2",
      nombre: "juan",
      correo: "juan@test.com",
      telefono: "123456789",
    },
    habitacion: {
      no_habitacion: 2,
      precio: 350000,
      estado: "reservada",
      tipo: "matrimonial",
    },
  },
  {
    no_reserva: "3",
    fecha_entrada: "2022-05-26T07:34",
    numero_noches: 1,
    cliente: {
      id: "3",
      nombre: "juan",
      correo: "juan@test.com",
      telefono: "123456789",
    },
    habitacion: {
      no_habitacion: 3,
      precio: 400000,
      estado: "reservada",
      tipo: "suite",
    },
  },
];
