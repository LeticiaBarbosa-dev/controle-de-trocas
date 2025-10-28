import { TrashIcon } from "@phosphor-icons/react";

export function CardProduto() {
  return (
    <div className="bg-[#1E1E1E] w-full p-3 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Produto 1</h3>
        <TrashIcon size={20} />
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="font-light text-lg">3 unidades</span>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-12 py-3 rounded-lg transition-all cursor-pointer"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
