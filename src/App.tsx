import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Trocas } from './pages/Trocas';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/trocas" element={<Trocas />} />
        {/* {/* <Route path="/sobre" element={<About />} /> */}
        {/* <Route path="/config" element={<Login2 />} />  */}
      </Routes>
    </>
  );
}

export default App;
