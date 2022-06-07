import React from "react";
import ReactPDF from "@react-pdf/renderer";
const { Image, Text, View } = ReactPDF;
import styles from "../pdfStyles";
import { formatCurrency } from "../utils";
import ITipoHabitacion from "../interfaces/TipoHabitacion";

interface TiposDeHabitacionProps {
  habitaciones: ITipoHabitacion[];
}

const TiposDeHabitacion = (props: TiposDeHabitacionProps) => {
  const { habitaciones } = props;
  return (
    <View>
      {habitaciones
        ?.sort((a, b) => a.precio - b.precio)
        .map((habitacion, index) => {
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
                {habitacion.tipo}
              </Text>
              <Text style={styles.text}>{habitacion.descripcion}</Text>
              <View style={styles.list}>
                <Text style={styles.text}>- Servicios: </Text>
                {habitacion.servicios.map((servicio, index) => (
                  <Text key={index} style={styles.item}>
                    {servicio}
                    {index !== habitacion.servicios.length - 1 ? ", " : "."}
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
