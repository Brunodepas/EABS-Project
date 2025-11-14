import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function HistoryDetail() {
  const { id } = useParams();
  const history = JSON.parse(localStorage.getItem("plant-history")) || [];
  const data = history[id];

  if (!data) {
    return <p className="p-6 text-green-700">No se encontró el análisis.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/history" className="flex items-center gap-2 text-green-700 mb-4">
        <ArrowLeft /> Volver
      </Link>

      <img
        src={data.image}
        alt="Detalle"
        className="w-full h-80 object-contain bg-white rounded-2xl shadow-md mb-6"
      />

      <h1 className="text-3xl font-bold text-green-900 mb-4">
        {data.planta}
      </h1>

      <p className="text-lg text-green-800 mb-2">
        <strong>Enfermedad:</strong> {data.enfermedad}
      </p>

      <p className="text-lg text-green-800 mb-2">
        <strong>Confianza:</strong> {data.confianza}
      </p>

      <div className="bg-green-50 p-4 rounded-xl border border-green-200 mt-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">Recomendación</h2>
        <p className="text-green-800">{data.recomendacion}</p>
      </div>
    </div>
  );
}
