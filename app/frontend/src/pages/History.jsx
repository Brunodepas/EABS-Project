import { useEffect, useState } from "react";
import { Leaf, Calendar, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setHistory([]);
          return;
        }
        setHistory(data);
        setFilteredHistory(data);
      })
      .catch((err) => console.error("Error cargando historial:", err));
  }, []);

  useEffect(() => {
    const resultado = history.filter(
      (item) =>
        item.plant_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.disease_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHistory(resultado);
  }, [search, history]);

  return (
    <div className="p-6 pl-28">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
        <Leaf size={32} className="text-green-500 drop-shadow-lg" />
        Historial de análisis
      </h1>

      {/* Buscador */}
      <div className="mb-8 flex items-center gap-3 p-3 bg-white backdrop-blur-md rounded-xl shadow-lg border border-green-100">
        <Search size={22} className="text-green-700" />
        <input
          type="text"
          placeholder="Buscar por planta o enfermedad..."
          className="w-full outline-none text-green-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-green-300 text-lg font-medium mb-6">
            No hay resultados. Analiza una planta para comenzar.
          </p>

          <button
            onClick={() => navigate("/image-upload")}
            className="px-6 py-3 bg-yellow-500 text-green-900 font-semibold rounded-full 
                      transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:scale-105"
          >
            Analizar imagen
          </button>
        </div>
      )}

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl shadow-lg overflow-hidden 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Imagen */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={item.image}
                alt="Planta analizada"
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>
            <div
              className="p-6 bg-gradient-to-b from-white to-green-50 space-y-2 rounded-b-2xl
                         transition-all duration-300
                         group-hover:opacity-0 group-hover:translate-y-2"
            >
              <h3 className="text-xl font-bold text-green-900 leading-tight">
                {item.plant_name}
              </h3>

              <p className="text-green-800 text-sm">
                <strong>Enfermedad:</strong> {item.disease_name}
              </p>

              <p className="text-green-800 text-sm">
                <strong>Confianza:</strong> {item.confidence.toFixed(2)}
              </p>

              <p className="text-gray-500 text-xs flex items-center gap-2 pt-2">
                <Calendar size={14} />
                {item.date ? new Date(item.date).toLocaleString("es-AR") : "Sin fecha"}
              </p>
            </div>
            <div
              className="absolute inset-0 top-56   /* top = altura de la imagen */
                        bg-green-700 text-white rounded-b-2xl
                        flex items-center justify-center p-6
                        opacity-0 translate-y-6
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300 pointer-events-none"
            >
              <p className="text-sm leading-relaxed text-center">
                <strong>Recomendación:</strong> {item.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
