import { Toaster } from "react-hot-toast";
import "./App.css";
import Backdrop from "./components/Backdrop";
import Navigator from "./routes/index";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 3500 }}
      />
      <Backdrop />
      <Navigator />
    </>
  );
}

export default App;
