import { PlusIcon, SignOutIcon } from "@phosphor-icons/react";
import { CardTroca } from "../components/CardTroca";
import { useEffect, useState } from "react";
import { CriarTrocaModal } from "../components/CriarTrocaModal";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface TrocaProps {
  id: string;
  nome: string;
  data_criacao: string;
  produtos_count: number;
}

export function Trocas() {
  const [trocas, setTrocas] = useState<TrocaProps[]>([]);
  const [novaTroca, setNovaTroca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 🔹 FUNÇÃO DE LOGOUT
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  // 🔹 Buscar trocas do banco
  useEffect(() => {
    const carregarTrocas = async () => {
      const { data: trocasData, error } = await supabase
        .from("trocas")
        .select("id, nome, data_criacao");

      if (error) {
        console.error("Erro ao buscar trocas:", error);
        return;
      }

      const trocasComContagem = await Promise.all(
        (trocasData || []).map(async (troca) => {
          const { count } = await supabase
            .from("produtos")
            .select("*", { count: "exact", head: true })
            .eq("troca_id", troca.id);

          return {
            ...troca,
            produtos_count: count ?? 0,
          };
        })
      );

      setTrocas(trocasComContagem);
    };

    carregarTrocas();
  }, []);

  // 🔹 Criar nova troca
  async function criarTroca(name?: string) {
    const nome = (name ?? novaTroca).trim();
    if (!nome) return alert("Digite um nome para a troca!");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Erro ao obter usuário:", userError);
        alert("Erro de autenticação. Faça login novamente.");
        return;
      }
      const userId = userData?.user?.id;
      if (!userId) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      const payload = {
        nome,
        data_criacao: new Date().toISOString(),
        user_id: userId,
      };

      const { data, error } = await supabase
        .from("trocas")
        .insert([payload])
        .select();

      if (error) {
        console.error("Erro ao criar troca:", error);
        alert("Erro ao criar troca: " + error.message);
        return;
      } else {
        const nova = {
          ...data[0],
          produtos_count: 0,
        };

        alert("Criado com sucesso!");
        setTrocas((prev) => [nova, ...prev]);
        setNovaTroca("");
        setIsModalOpen(false);
      }
    } catch (err: any) {
      console.error("Erro inesperado ao criar troca:", err);
      alert("Erro inesperado ao criar troca.");
    }
  }

  // 🔹 Excluir troca
  const handleDeleteTroca = async (id: string) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta troca?"
    );

    if (!confirmar) return;

    const { error } = await supabase.from("trocas").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir troca:", error.message);
      alert("Erro ao excluir troca!");
    } else {
      setTrocas((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* HEADER COM LOGOUT */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">Minhas Trocas</h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-3.5 py-2 rounded-md hover:opacity-90 cursor-pointer"
        >
          <SignOutIcon/> Sair
        </button>
      </div>

      {/* Botão flutuante */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusIcon size={32} color="#FFFFFF" />
      </button>

      {/* Lista */}
      <ul className="space-y-3">
        {trocas.map((troca) => (
          <CardTroca
            key={troca.id}
            id={troca.id}
            nome={troca.nome}
            dataCriacao={troca.data_criacao}
            totalProdutos={troca.produtos_count}
            onClick={() => navigate(`/troca/${troca.id}`)}
            onDelete={() => handleDeleteTroca(troca.id)}
          />
        ))}

        {trocas.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Nenhuma troca criada ainda.
          </p>
        )}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <CriarTrocaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={criarTroca}
          novaTroca={novaTroca}
          setNovaTroca={setNovaTroca}
        />
      )}
    </div>
  );
}
