import { XIcon } from "@phosphor-icons/react";

interface CriarTrocaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  novaTroca: string;
  setNovaTroca: React.Dispatch<React.SetStateAction<string>>;
}

export function CriarTrocaModal({
  isOpen,
  onClose,
  onSave,
  novaTroca,
  setNovaTroca,
}: CriarTrocaModalProps) {
  if (!isOpen) return null;

  function handleSave() {
    if (novaTroca.trim()) {
      onSave(novaTroca);
      setNovaTroca("");
      onClose();
    } else {
      alert("Digite um nome para a troca!");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] rounded-2xl p-6 w-[90%] max-w-sm text-white shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Criar nova lista</h2>
          <XIcon
            className="opacity-50 cursor-pointer"
            size={32}
            color="#FFFFFF"
            onClick={onClose}
          />
        </div>

        <label className="block text-sm mb-2">Nome</label>
        <input
          type="text"
          value={novaTroca}
          onChange={(e) => setNovaTroca(e.target.value)}
          placeholder="Digite o nome da lista"
          className="w-full p-2 bg-[#2a2a2a] rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSave}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition cursor-pointer"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
