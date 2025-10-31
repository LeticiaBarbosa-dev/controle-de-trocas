import { ArrowLeftIcon, CameraIcon, FloppyDiskIcon } from "@phosphor-icons/react";

export function AdicionarProduto() {
  return (
    <div className="text-white h-screen flex flex-col p-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <ArrowLeftIcon size={32} />
          <h1 className="ml-4 text-2xl font-semibold mb-2">
            Adicionar produto
          </h1>
        </div>
        <button
          // onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-6 gap-2 font-light rounded-lg transition-all cursor-pointer flex flex-row justify-center items-center mb-4"
        >
          <FloppyDiskIcon size={32} />
          Salvar
        </button>
      </div>
      <hr className="mb-3 text-gray-600" />
      <div className="flex flex-col gap-3">
        <div className="bg-[#1E1E1E] flex items-center justify-center p-12 rounded-lg">
          <CameraIcon size={68} />
        </div>
      </div>
    </div>
  );
}
