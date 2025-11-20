// src/pages/AdicionarProduto.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function AdicionarProduto() {
  const { id } = useParams(); // id da troca vindo da rota /troca/:id/adicionar
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSalvar() {
    if (!file) return alert("Tire ou selecione uma foto do produto.");
    if (!id) return alert("ID da troca não encontrado.");

    setLoading(true);
    try {
      // 1) criar nome / caminho do arquivo: agrupamos por troca para organização
      const timestamp = Date.now();
      const safeFileName = `${timestamp}-${file.name.replace(/\s+/g, "_")}`;
      const path = `troca_${id}/${safeFileName}`;

      // 2) Upload para o bucket 'produtos'
      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      // 3) Obter URL pública do arquivo
      const { data: publicUrlData } = supabase.storage
        .from("produtos")
        .getPublicUrl(path);

      const imagem_url = publicUrlData.publicUrl;

      // 3.5) pegar usuário autenticado e incluir user_id
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        alert("Usuário não autenticado. Faça login novamente.");
        navigate("/");
        return;
      }
      const userId = userData.user.id;

      // 4) Inserir o registro na tabela 'produtos'
      const trocaIdNum = isNaN(Number(id)) ? id : Number(id); // adapta caso id seja string uuid ou number
      const { error: insertError } = await supabase.from("produtos").insert([
        {
          troca_id: trocaIdNum,
          imagem_url,
          quantidade,
          data_adicao: new Date().toISOString(),
          user_id: userId,
        },
      ]);

      if (insertError) throw insertError;

      alert("Produto adicionado com sucesso!");
      // volta para a página da troca (lista de produtos)
      navigate(`/troca/${id}`);
    } catch (err: any) {
      console.error("Erro ao salvar produto:", err);
      alert("Erro ao salvar produto: " + (err.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white min-h-screen p-4 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-300">
          ← Voltar
        </button>
        <h1 className="text-2xl font-semibold">Adicionar Produto</h1>
      </div>

      <div className="bg-[#1E1E1E] rounded-lg p-4 flex flex-col gap-4 max-w-xl w-full">
        <label className="text-sm text-gray-200">Foto do produto</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onSelectFile}
          className="text-sm"
        />

        {preview && (
          <img
            src={preview}
            alt="prévia"
            className="w-full max-w-xs h-48 object-cover rounded"
          />
        )}

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Quantidade</label>
            <input
              type="number"
              min={1}
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="w-28 p-2 rounded bg-[#0f1724] text-white"
            />
          </div>

          <button
            onClick={() => {
              // foco rápido: reabre camera em alguns browsers móveis
              document
                .querySelector<HTMLInputElement>('input[type="file"]')
                ?.click();
            }}
            className="ml-4 bg-gray-700 px-3 py-2 rounded"
          >
            Tirar/Selecionar Foto
          </button>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSalvar}
            disabled={loading}
            className={`bg-blue-600 px-4 py-2 rounded disabled:opacity-60`}
          >
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>

          <button
            onClick={() => navigate(`/troca/${id}`)}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
