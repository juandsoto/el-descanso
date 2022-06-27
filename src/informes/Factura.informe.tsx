import ReactPDF from "@react-pdf/renderer";
const { Text, View } = ReactPDF;
import styles from "../pdfStyles";
import { formatCurrency } from "../utils";
import moment from "moment";
import IFactura from "../interfaces/Factura";
import IServicioIncluido from "../interfaces/ServicioIncluido";

interface FacturaProps {
  factura: IFactura;
  serviciosIncluidos: IServicioIncluido[];
  recargo: () => boolean;
}

const Factura = (props: FacturaProps) => {
  const { factura, serviciosIncluidos, recargo } = props;
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...styles.subtitle1,
            color: "#0cb0a9",
            textTransform: "capitalize",
          }}
        >
          Cliente
        </Text>
        <View style={{ ...styles.list, flexDirection: "column" }}>
          {Object.entries(factura?.reserva.cliente || {}).map(
            ([key, value], index) => {
              return (
                <Text
                  key={key}
                  style={{ ...styles.item, textTransform: "capitalize" }}
                >
                  - {key}: {value}
                </Text>
              );
            }
          )}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...styles.subtitle1,
            color: "#0cb0a9",
            textTransform: "capitalize",
          }}
        >
          Factura #{factura.no_factura}
        </Text>
        <Text
          style={{
            ...styles.text,
          }}
        >
          Fecha:{" "}
          {moment(factura.fecha_factura)
            .add(5, "hours")
            .format("DD/MM/YYYY, HH:mm a")}
        </Text>
        <Text
          style={{
            ...styles.text,
          }}
        >
          Precio Total: {formatCurrency(factura.precio_total)}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...styles.subtitle1,
            color: "#0cb0a9",
            textTransform: "capitalize",
          }}
        >
          Reserva #{factura.reserva.no_reserva}
        </Text>
        <View style={styles.list}>
          <Text style={styles.text}>- Habitacion: </Text>
          {Object.entries(factura.reserva.habitacion || {}).map(
            ([key, value], index) => {
              if (key === "estado") {
                return null;
              }
              if (key === "tipo") {
                return Object.entries(
                  factura.reserva.habitacion.tipo || {}
                ).map(([tKey, tValue], index) => {
                  if (tKey === "descripcion") return null;
                  return (
                    <Text
                      key={tKey}
                      style={{
                        ...styles.item,
                        textTransform: "capitalize",
                      }}
                    >
                      {tKey}:{" "}
                      {tKey === "precio"
                        ? formatCurrency(
                            Number(tValue) * factura.reserva.numero_noches
                          )
                        : tValue}
                      {index !==
                      Object.values(factura.reserva.habitacion.tipo).length - 1
                        ? ", "
                        : "."}
                    </Text>
                  );
                });
              }
              return (
                <Text
                  key={key}
                  style={{ ...styles.item, textTransform: "capitalize" }}
                >
                  {key}: {value}
                  {index !==
                  Object.values(factura.reserva.habitacion).length - 1
                    ? ", "
                    : "."}
                </Text>
              );
            }
          )}
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>- Fecha de entrada: </Text>
          <Text style={styles.item}>
            {moment(factura.reserva.fecha_entrada)
              .add(5, "hours")
              .format("DD/MM/YYYY, HH:mm a")}
          </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>- Número de noches: </Text>
          <Text style={styles.item}>{factura.reserva.numero_noches}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...styles.subtitle1,
            color: "#0cb0a9",
            textTransform: "capitalize",
          }}
        >
          Servicios Incluidos{" "}
        </Text>
        {Object.values(serviciosIncluidos || {}).map((servicio, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  ...styles.text,
                  textTransform: "capitalize",
                }}
              >
                {servicio.servicio.nombre} -{" "}
                {formatCurrency(servicio.servicio.precio)}
              </Text>
              <Text
                style={{
                  ...styles.text,
                }}
              >
                Fecha:{" "}
                {moment(servicio.fecha_servicio)
                  .add(5, "hours")
                  .format("DD/MM/YYYY, HH:mm a")}
              </Text>
            </View>
          );
        })}
      </View>
      {recargo() && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: "#ffa801",
            }}
          >
            Se aplicó recargo por valor de{" "}
            {formatCurrency(factura.reserva.habitacion.tipo.precio)}{" "}
            (habitación) por realizar checkout +13 horas después de la fecha de
            salida estimada
          </Text>
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            ...styles.subtitle1,
            color: "#0cb0a9",
            textTransform: "capitalize",
          }}
        >
          Checkout #{factura.checkout?.no_checkout}
        </Text>
        <Text
          style={{
            ...styles.text,
          }}
        >
          Fecha:{" "}
          {moment(factura.checkout?.fecha_salida)
            .add(5, "hours")
            .format("DD/MM/YYYY, HH:mm a")}
        </Text>
      </View>
    </View>
  );
};

export default Factura;
