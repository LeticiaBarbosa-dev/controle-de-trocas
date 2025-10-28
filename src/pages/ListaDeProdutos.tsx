import { ArrowLeftIcon } from "@phosphor-icons/react";
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
        <CardProduto />
        <CardProduto />
        <CardProduto />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 px-12 py-3 rounded-lg transition-all cursor-pointer mt-8">
        Adicionar produto
      </button>
    </div>
  );
}
