import { useEffect, useState } from "react";
import { Leaf, Calendar, Search } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  //Cargo historial desde el back
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

  // Funcion para poder filtrar
  useEffect(() => {
    const resultado = history.filter(
      (item) =>
        item.plant_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.disease_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHistory(resultado);
  }, [search, history]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-900 mb-6 flex items-center gap-3">
        <Leaf size={32} className="text-green-600" /> Historial de análisis
      </h1>

      {/* Buscador */}
      <div className="mb-6 flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
        <Search size={22} className="text-green-600" />
        <input
          type="text"
          placeholder="Buscar por planta o enfermedad..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Lista vacía */}
      {filteredHistory.length === 0 && (
        <p className="text-green-700 text-center mt-10">
          No hay resultados. Analiza una planta para comenzar.
        </p>
      )}

      {/* Lista del historial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
          >
            <h3 className="text-lg font-semibold text-green-900">
              {item.plant_name}
            </h3>

            <p className="text-green-700 text-sm">
              <strong>Enfermedad:</strong> {item.disease_name}
            </p>

            <p className="text-green-700 text-sm">
              <strong>Confianza:</strong> {item.confidence}
            </p>

            <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
              <Calendar size={16} />
              {item.date ? new Date(item.date).toLocaleString() : "Sin fecha"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
