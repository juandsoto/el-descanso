import React from "react";
import ReactPDF from "@react-pdf/renderer";
const { Image, Text, View } = ReactPDF;
import { tipoHabitaciones } from "../data";
import styles from "../pdfStyles";
import { formatCurrency } from "../utils";
import { hardReservas } from "../data/index";
import IReserva from "../interfaces/Reserva";

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
      {reservas.map((reserva, index) => {
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
              {Object.entries(reserva.habitacion).map(([key, value], index) => {
                if (key === "estado") {
                  return null;
                }
                return (
                  <Text
                    key={key}
                    style={{ ...styles.item, textTransform: "capitalize" }}
                  >
                    {key} - {value}
                    {index !== Object.values(reserva.habitacion).length - 1
                      ? ", "
                      : "."}
                  </Text>
                );
              })}
            </View>
            <View style={styles.list}>
              <Text style={styles.text}>- Fecha de entrada: </Text>
              <Text key={index} style={styles.item}>
                {reserva.fecha_entrada.toLocaleString()}
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
