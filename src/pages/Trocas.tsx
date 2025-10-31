import { PlusIcon } from "@phosphor-icons/react";
import { CardTroca } from "../components/CardTroca";
import { useState } from "react";
import { CriarTrocaModal } from "../components/CriarTrocaModal";

export function Trocas() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSave(name: string) {
    console.log("Nova lista criada:", name);
  }

  return (
    <div className="text-white h-screen flex flex-col p-4">
      <h1 className="text-3xl font-semibold mb-2">Lista de Trocas</h1>
      <hr className="mb-3 text-gray-600" />
      <div className="flex flex-col gap-3">
        <CardTroca />
        <CardTroca />
        <CardTroca />
        <CardTroca />
        <CardTroca />
        <CardTroca />
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-all cursor-pointer flex flex-col justify-center items-center"
        >
          <PlusIcon size={32} />
        </button>
      </div>
      <CriarTrocaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
