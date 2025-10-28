import { TrashIcon } from "@phosphor-icons/react";

export function CardTroca() {
  return (
    <div className="bg-[#1E1E1E] w-full p-3 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Lacre verde - 0652965</h3>
        <TrashIcon size={20} />
      </div>
      <span className="font-light text-lg">3 produtos - Criado em 17/10/2025</span>
    </div>
  );
}
