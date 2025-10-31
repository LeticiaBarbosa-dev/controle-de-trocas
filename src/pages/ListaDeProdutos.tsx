import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react";
import { CardProduto } from "../components/CardProduto";

export function ListaDeProdutos() {
  return (
    <div className="text-white h-screen flex flex-col p-4">
      <div className="flex">
        <ArrowLeftIcon size={32} />
        <h1 className="ml-4 text-2xl font-semibold mb-2">
          Lacre verde - 0652965
        </h1>
      </div>
      <hr className="mb-3 text-gray-600" />
      <div className="flex flex-col gap-3">
        <CardProduto />
        <CardProduto />
        <CardProduto />
        <div className="flex justify-end mt-6 mb-4">
          <button
            // onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-all cursor-pointer flex flex-col justify-center items-center"
          >
            <PlusIcon size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
