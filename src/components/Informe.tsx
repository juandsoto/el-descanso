import ReactPDF from "@react-pdf/renderer";
const { Image, Document, Page, Text, View } = ReactPDF;

const MyDocument: any = Document;
const MyPage: any = Page;

import styles from "../pdfStyles";
interface InformeProps {
  data: {
    title: string;
  };
  children: JSX.Element | JSX.Element[];
}

const Informe = (props: InformeProps) => {
  const { data, children } = props;
  return (
    <MyDocument>
      <MyPage style={styles.body}>
        <Image style={styles.logo} src="/src/assets/images/logopdf.jpg" fixed />

        <View>
          <Text style={styles.header}>el descanso</Text>
          <Text style={styles.title}>{data.title}</Text>
          {children}
        </View>
      </MyPage>
    </MyDocument>
  );
};

export default Informe;
