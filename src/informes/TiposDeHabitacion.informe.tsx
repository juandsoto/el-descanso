import React from "react";
import ReactPDF from "@react-pdf/renderer";
const { Image, Text, View } = ReactPDF;
import { tipoHabitaciones } from "../data";
import styles from "../pdfStyles";
import { formatCurrency } from "../utils";

const TiposDeHabitacion = () => {
  return (
    <View>
      {tipoHabitaciones.map((habitacion, index) => {
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
              {habitacion.nombre}
            </Text>
            <Text style={styles.text}>{habitacion.description}</Text>
            <View style={styles.list}>
              <Text style={styles.text}>- Servicios: </Text>
              {habitacion.services.map((service, index) => (
                <Text key={index} style={styles.item}>
                  {service}
                  {index !== habitacion.services.length - 1 ? ", " : "."}
                </Text>
              ))}
            </View>
            <View style={styles.list}>
              <Text style={styles.text}>- Precio: </Text>
              <Text key={index} style={{ ...styles.item, color: "#0cb0a9" }}>
                {formatCurrency(habitacion.precio)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TiposDeHabitacion;
