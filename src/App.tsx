import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Trocas } from "./pages/Trocas";
import { ListaDeProdutos } from "./pages/ListaDeProdutos";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { AdicionarProduto } from "./pages/AdicionarProduto";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/trocas"
        element={
          <PrivateRoutes>
            <Trocas />
          </PrivateRoutes>
        }
      />

      <Route
        path="/troca/:id"
        element={
          <PrivateRoutes>
            <ListaDeProdutos />
          </PrivateRoutes>
        }
      />

      <Route
        path="/troca/:id/adicionar-produto"
        element={
          <PrivateRoutes>
            <AdicionarProduto />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default App;
