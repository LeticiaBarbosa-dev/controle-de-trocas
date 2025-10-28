import { CardTroca } from "../components/CardTroca";

export function Trocas() {
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
    </div>
  );
}
