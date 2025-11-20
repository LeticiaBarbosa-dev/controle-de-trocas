import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@phosphor-icons/react";
import { supabase } from "../supabaseClient";

interface Produto {
  id: number;
  imagem_url: string;
  quantidade: number;
  troca_id: number;
  data_adicao: string;
}

export function DetalheProduto() {
  const { id } = useParams(); // ID do produto
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar produto pelo ID
  useEffect(() => {
    async function carregarProduto() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao carregar produto:", error);
      } else {
        setProduto(data);
      }

      setLoading(false);
    }

    carregarProduto();
  }, [id]);

  async function excluirProduto() {
    if (!produto) return;

    const confirmar = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmar) return;

    // 1 — deletar no banco
    const { error: errorDb } = await supabase
      .from("produtos")
      .delete()
      .eq("id", produto.id);

    if (errorDb) {
      alert("Erro ao excluir o produto.");
      return;
    }

    // 2 — deletar imagem do storage (se existir)
    if (produto.imagem_url) {
      try {
        const bucketPath = produto.imagem_url.split("/public/")[1];
        await supabase.storage.from("produtos").remove([bucketPath]);
      } catch {
        console.warn("Imagem não encontrada no storage.");
      }
    }

    alert("Produto excluído.");
    navigate(-1); // volta para lista de produtos da troca
  }

  if (loading) return <p className="text-white p-4">Carregando...</p>;
  if (!produto) return <p className="text-white p-4">Produto não encontrado.</p>;

  return (
    <div className="text-white h-screen flex flex-col p-4">
      {/* HEADER */}
      <div className="flex items-center mb-4">
        <ArrowLeftIcon
          size={32}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="ml-4 text-2xl font-semibold">Detalhes do Produto</h1>
      </div>

      {/* CONTEÚDO */}
      <div className="flex flex-col gap-6 bg-[#1E1E1E] p-4 rounded-xl">

        {/* IMAGEM */}
        <img
          src={produto.imagem_url}
          alt="Produto"
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* QUANTIDADE */}
        <p className="text-xl">
          <strong>Quantidade:</strong> {produto.quantidade}
        </p>

        {/* BOTÃO EXCLUIR */}
        <button
          onClick={excluirProduto}
          className="bg-red-600 hover:bg-red-700 py-3 rounded-lg flex justify-center items-center gap-2"
        >
          <TrashIcon size={20} />
          Excluir Produto
        </button>
      </div>
    </div>
  );
}
