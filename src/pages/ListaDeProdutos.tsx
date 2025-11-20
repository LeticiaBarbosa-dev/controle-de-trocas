import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react";
import { CardProduto } from "../components/CardProduto";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface Produto {
  id: number;
  quantidade: number;
  imagem_url: string;
  troca_id: number;
  data_adicao: string;
}

export function ListaDeProdutos() {
  const { id } = useParams(); // ID da TROCA
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar produtos desta troca
  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("troca_id", id)
        .order("data_adicao", { ascending: true });

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProdutos(data || []);
      }

      setLoading(false);
    }

    carregarProdutos();
  }, [id]);

  if (loading) {
    return <p className="text-white p-4">Carregando produtos...</p>;
  }

  return (
    <div className="text-white h-screen flex flex-col p-4">
      <div className="flex items-center">
        <ArrowLeftIcon size={32} className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="ml-4 text-2xl font-semibold mb-2">Produtos</h1>
      </div>

      <hr className="mb-3 text-gray-600" />

      <div className="flex flex-col gap-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            nome={`Produto ${produto.id}`} // você pode substituir depois pelo nome real se tiver
            quantidade={produto.quantidade}
            onView={() => navigate(`/produto/${produto.id}`)}
          />
        ))}

        {/* Botão adicionar produto */}
        <button
          onClick={() => navigate(`/troca/${id}/adicionar`)} 
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full cursor-pointer"
        >
          <PlusIcon size={32} />
        </button>
      </div>
    </div>
  );
}
