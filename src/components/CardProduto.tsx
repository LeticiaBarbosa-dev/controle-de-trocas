import { TrashIcon } from "@phosphor-icons/react";

export function CardProduto() {
  return (
    <div className="bg-[#1E1E1E] w-full p-3 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Produto 1</h3>
        <TrashIcon className="cursor-pointer" size={20} />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="font-light text-lg italic">3 unidades</span>
        <button
          type="submit"
          className="h-10 bg-blue-600 hover:bg-blue-700 px-12 py-3 rounded-lg transition-all cursor-pointer flex items-center justify-center"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
