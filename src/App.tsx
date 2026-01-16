import { BrowserRouter } from "react-router";
import AppRouter from "./components/AppRouter";
import { Global } from "./styled/global";

function App() {
  return (
    <BrowserRouter>
      <Global />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
