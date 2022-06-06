import { Button } from "@mui/material";
import ReactPDF from "@react-pdf/renderer";
const { Image, Document, Page, Text, Font, View } = ReactPDF;
import { useTheme } from "@mui/material/styles";
import styles from "../pdfStyles";
import React from "react";

interface InformeProps {
  data: {
    title: string;
  };
  children: JSX.Element | JSX.Element[];
}

const Informe = (props: InformeProps) => {
  const { data, children } = props;
  const theme = useTheme();
  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.logo} src="/src/assets/images/logopdf.jpg" />

        <View>
          <Text style={styles.header}>el descanso</Text>
          <Text style={styles.title} fixed>
            {data.title}
          </Text>
          {/* <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          /> */}
          {children}
        </View>
      </Page>
    </Document>
  );
};

export default Informe;
