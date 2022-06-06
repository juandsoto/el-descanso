import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "roboto",
  src: "https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2",
});
export default StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 35,
    letterSpacing: 0.5,
    fontFamily: "roboto",
    lineHeight: 1.2,
  },
  header: {
    fontSize: 24,
    borderBottom: "1px solid #0cb0a9",
    textTransform: "capitalize",
    marginHorizontal: "auto",
    marginBottom: 35,
    // fontFamily: "Oswald",
    lineHeight: 1.2,
  },
  logo: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 50,
    height: 50,
  },
  // author: {
  //   fontSize: 12,
  //   textAlign: "center",
  //   marginBottom: 40,
  // },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
    color: "#0cb0a9",
    letterSpacing: 1,
  },
  subtitle1: {
    marginBottom: 4,
    fontSize: 17,
    textAlign: "justify",
  },
  text: {
    fontSize: 12,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  list: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
  item: {
    fontSize: 12,
    textAlign: "justify",
    color: "rgba(0,0,0,0.87)",
  },
});
