import { Toaster } from "react-hot-toast";
import "./App.css";
import Navigator from "./routes/index";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 3500 }}
      />
      <Navigator />
    </>
  );
}

export default App;
