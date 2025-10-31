import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // login padrão
    const usuarioPadrao = "admin";
    const senhaPadrao = "1234";

    if (usuario === usuarioPadrao && senha === senhaPadrao) {
      localStorage.setItem("logado", "true");
      navigate("/trocas");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  }

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="bg-[#1E1E1E] flex flex-col items-center w-full max-w-xl p-10 gap-3 rounded-lg">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mb-3 p-3 rounded w-full border-[0.5px] border-gray-600 placeholder:text-gray-400 placeholder:text-xs"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mb-3 p-3 rounded w-full border-[0.5px] border-gray-600 placeholder:text-gray-400 placeholder:text-xs"
          />
          {erro && <p className="text-red-400 mb-2">{erro}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-all w-full cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
