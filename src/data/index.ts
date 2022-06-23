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
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IAvailableServices from "../interfaces/AvailableServices";
import { NombreTipoHabitacion } from "../interfaces/TipoHabitacion";
import { CodServicio } from "../interfaces/Servicio";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const nombreTipoHabitaciones: Exclude<NombreTipoHabitacion, "todas">[] =
  ["sencilla", "doble", "matrimonial", "suite sencilla", "suite presidencial"];

export const tipoHabitaciones: Pick<
  ITipoHabitacion,
  "tipo" | "images" | "servicios"
>[] = [
  {
    tipo: "sencilla",
    images: [SencillaImage, DobleImage, MatrimonialImage],
    servicios: ["restaurante"],
  },
  {
    tipo: "doble",
    images: [DobleImage, MatrimonialImage, SuiteSencillaImage],
    servicios: ["restaurante", "llamadas de larga distancia"],
  },
  {
    tipo: "matrimonial",
    images: [MatrimonialImage, SuiteSencillaImage, SuitePresidencialImage],
    servicios: ["restaurante", "llamadas de larga distancia", "lavado"],
  },
  {
    tipo: "suite sencilla",
    images: [
      SuiteSencillaImage,
      SuitePresidencialImage,
      SencillaImage,
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    ],
    servicios: [
      "restaurante",
      "llamadas de larga distancia",
      "lavado",
      "planchado",
    ],
  },
  {
    tipo: "suite presidencial",
    images: [SuitePresidencialImage, SencillaImage, DobleImage],
    servicios: [
      "restaurante",
      "llamadas de larga distancia",
      "lavado",
      "planchado",
      "bar",
    ],
  },
];

export const nombreServicios: CodServicio[] = [
  "restaurante",
  "llamadas",
  "lavado",
  "planchado",
  "bar",
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
        font: {
          size: 16,
        },
      },
    },
  },
  data: {
    labels: nombreServicios,
    datasets: [
      {
        label: "numero de reservas en que se usa el servicio",
        data: nombreServicios.map(
          (_, index) => (index + 1) * Math.round(Math.random() * 10)
        ),
        borderWidth: 0,
        backgroundColor: [
          "rgba(39, 60, 117,0.9)",
          "rgba(255, 205, 60, 0.9)",
          "rgba(50, 255, 126,0.9)",
          "rgba(125, 95, 255,0.9)",
          "rgba(23, 192, 235,0.9)",
        ],
      },
    ],
  },
};

export const diasLabels = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
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
        display: false,
      },
      title: {
        display: true,
        text: "Porcentaje ocupacion hotel",
        font: {
          size: 16,
        },
      },
    },
    layout: { padding: 10 },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
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
        display: false,
      },
      title: {
        display: true,
        text: "Ventas mensuales",
        font: {
          size: 16,
        },
      },
    },
    layout: { padding: 10 },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
  data: {
    labels: diasLabels,
    datasets: [
      {
        label: "Ventas",
        data: diasLabels.map((_, index) => index * Math.random() * 1000000),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  },
};

export const ventasMensualesPorServicio = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Ventas mensuales por servicio",
        font: {
          size: 16,
        },
      },
    },
    layout: { padding: 10 },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
  data: {
    labels: nombreServicios,
    datasets: [
      {
        label: "Ventas",
        data: nombreServicios.map(
          (_, index) => index * Math.random() * 1000000
        ),
        borderColor: "rgb(23, 192, 235)",
        backgroundColor: "rgba(23, 192, 235,0.5)",
      },
    ],
  },
};

export const availableServices: IAvailableServices[] = [
  {
    habitacion: "Sencilla",
    restaurante: true,
    llamadas: false,
    lavado: false,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Doble",
    restaurante: true,
    llamadas: true,
    lavado: false,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Matrimonial",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: false,
    bar: false,
  },
  {
    habitacion: "Suite Sencilla",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: true,
    bar: false,
  },
  {
    habitacion: "Suite Presidencial",
    restaurante: true,
    llamadas: true,
    lavado: true,
    planchado: true,
    bar: true,
  },
];
