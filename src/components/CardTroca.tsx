import { TrashIcon } from "@phosphor-icons/react";

interface CardTrocaProps {
  id: string;
  nome: string;
  totalProdutos: number;
  dataCriacao: string;
  onClick: () => void;
  onDelete: () => void;
}

export function CardTroca({
  nome,
  totalProdutos,
  dataCriacao,
  onClick,
  onDelete,
}: CardTrocaProps) {
  return (
    <div
      className="bg-[#1E1E1E] w-full p-3 rounded-lg flex flex-col gap-4 cursor-pointer text-white"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">{nome}</h3>

        <TrashIcon
          onClick={(e) => {
            e.stopPropagation(); // evita que clique no delete entre na troca
            onDelete();
          }}
          className="cursor-pointer hover:opacity-70"
          size={20}
        />
      </div>

      <span className="font-light text-base">
        {`${totalProdutos} produtos • Criado em ${new Date(
          dataCriacao
        ).toLocaleDateString("pt-BR")}`}
      </span>
    </div>
  );
}
