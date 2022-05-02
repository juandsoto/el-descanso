import { IHabitacion } from "../interfaces/Habitacion";
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

export const habitaciones: IHabitacion[] = [
  {
    name: "sencilla",
    images: [SencillaImage, DobleImage, MatrimonialImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    price: 199900,
    services: ["restaurante"],
  },
  {
    name: "doble",
    images: [DobleImage, MatrimonialImage, SuiteSencillaImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    price: 199900,
    services: ["restaurante", "llamadas de larga distancia"],
  },
  {
    name: "matrimonial",
    images: [MatrimonialImage, SuiteSencillaImage, SuitePresidencialImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    price: 199900,
    services: ["restaurante", "llamadas de larga distancia", "lavado"],
  },
  {
    name: "suite sencilla",
    images: [SuiteSencillaImage, SuitePresidencialImage, SencillaImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    price: 199900,
    services: [
      "restaurante",
      "llamadas de larga distancia",
      "lavado",
      "planchado",
    ],
  },
  {
    name: "suite presidencial",
    images: [SuitePresidencialImage, SencillaImage, DobleImage],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum tenetur quam ab iusto itaque in, enim a! Officiis, nisi!",
    price: 199900,
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
