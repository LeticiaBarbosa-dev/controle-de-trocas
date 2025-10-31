import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Trocas } from './pages/Trocas';
import { ListaDeProdutos } from './pages/ListaDeProdutos';
import { AdicionarProduto } from './pages/AdicionarProduto';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/trocas" element={<Trocas />} />
        <Route path="/produtos-lancados" element={<ListaDeProdutos />} />
        <Route path="/adicionar-produto" element={<AdicionarProduto />} />
        {/* {/* <Route path="/sobre" element={<About />} /> */}
        {/* <Route path="/config" element={<Login2 />} />  */}
      </Routes>
    </>
  );
}

export default App;
