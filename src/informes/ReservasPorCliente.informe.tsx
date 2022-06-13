import ReactPDF from "@react-pdf/renderer";
const { Text, View } = ReactPDF;
import styles from "../pdfStyles";
import { formatCurrency } from "../utils";
import IReserva from "../interfaces/Reserva";
import moment from "moment";

interface ReservasPorClienteProps {
  reservas: IReserva[];
}

const ReservasPorCliente = (props: ReservasPorClienteProps) => {
  const { reservas } = props;
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
          {Object.entries(reservas[0]?.cliente || {}).map(
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
      {reservas
        .sort((a, b) => a.no_reserva - b.no_reserva)
        .map((reserva, index) => {
          return (
            <View
              key={index}
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
                Reserva #{reserva.no_reserva}
              </Text>
              <View style={styles.list}>
                <Text style={styles.text}>- Habitacion: </Text>
                {Object.entries(reserva.habitacion).map(
                  ([key, value], index) => {
                    if (key === "estado") {
                      return null;
                    }
                    if (key === "tipo") {
                      return Object.entries(reserva.habitacion.tipo).map(
                        ([tKey, tValue], index) => {
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
                                    Number(tValue) * reserva.numero_noches
                                  )
                                : tValue}
                              {index !==
                              Object.values(reserva.habitacion.tipo).length - 1
                                ? ", "
                                : "."}
                            </Text>
                          );
                        }
                      );
                    }
                    return (
                      <Text
                        key={key}
                        style={{ ...styles.item, textTransform: "capitalize" }}
                      >
                        {key}: {value}
                        {index !== Object.values(reserva.habitacion).length - 1
                          ? ", "
                          : "."}
                      </Text>
                    );
                  }
                )}
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>- Fecha de entrada: </Text>
                <Text key={index} style={styles.item}>
                  {moment(reserva.fecha_entrada)
                    .add(5, "hours")
                    .format("DD/MM/YYYY, HH:mm")}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.text}>- Número de noches: </Text>
                <Text key={index} style={styles.item}>
                  {reserva.numero_noches}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default ReservasPorCliente;
