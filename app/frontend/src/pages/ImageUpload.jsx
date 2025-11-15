import { useState, useRef } from "react";
import { Upload, Leaf, Activity, Info } from "lucide-react";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/?t=${Date.now()}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();
        setPrediction(data.error ? { error: data.error } : data);

      } catch (err) {
        console.error("Error enviando la imagen:", err);
        setPrediction({ error: "Error de conexión con el servidor." });

      } finally {
        setLoading(false);
        setShowResults(true);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageUpload(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setShowResults(false);
    setPrediction(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-6 pl-28">

      {/* ⭐⭐⭐ TUTORIAL – MODERNO Y MINIMALISTA ⭐⭐⭐ */}
      {!showResults && (
        <div className="mb-10 bg-white/70 backdrop-blur-sm border border-green-200 rounded-2xl p-5 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Info className="text-green-700" size={22} />
            <h2 className="text-lg font-semibold text-green-900">
              ¿Cómo funciona este análisis?
            </h2>
          </div>

          <ul className="text-green-800 text-sm space-y-2 leading-relaxed">
            <li>• Subí una foto clara de una hoja o planta.</li>
            <li>• Nuestro sistema usa IA para detectar la especie y su estado.</li>
            <li>• El análisis tarda unos segundos y verás:
              <span className="font-semibold"> planta </span>,
              <span className="font-semibold"> enfermedad </span> (si es que existe),
              <span className="font-semibold"> confianza </span> y
              <span className="font-semibold"> tratamiento recomendado</span>.
            </li>
          </ul>
        </div>
      )}

      {/* Caja de subida */}
      {!showResults && (
        <div className="mb-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`bg-white rounded-2xl shadow-md p-8 border-2 border-dashed transition-all duration-300 ${
              isDragging ? "border-green-500 bg-green-50 scale-105"
                         : "border-green-300 hover:border-green-400"
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
                <Upload className="text-green-600" size={32} />
              </div>

              <h2 className="text-xl font-semibold text-green-900 mb-2">
                Sube una foto de tu planta
              </h2>

              <p className="text-green-700 mb-4">
                Arrastra y suelta o haz clic para seleccionar
              </p>

              <label className="inline-block">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="px-6 py-3 bg-yellow-500 text-green-900 font-semibold rounded-full cursor-pointer inline-block transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:scale-105">
                  Seleccionar imagen
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Imagen cargada */}
      {selectedImage && (
        <div className="mb-8 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-green-300">
            <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
              <Leaf className="text-green-600" size={24} /> Imagen cargada
            </h3>

            <img
              src={selectedImage}
              alt="Uploaded plant"
              className="w-full h-96 object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Resultados */}
      {showResults && selectedImage && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-300 text-center">

            {loading ? (
              <>
                <Activity className="text-green-600 mx-auto mb-4 animate-spin" size={40} />
                <p className="text-green-800 font-medium">Analizando imagen...</p>
              </>
            ) : prediction?.error ? (
              <p className="text-red-600 font-semibold mb-4">❌ {prediction.error}</p>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-2">🌿 {prediction.planta}</h3>
                  <p className="text-lg text-green-700 mb-2"><strong>Estado:</strong> {prediction.enfermedad}</p>
                  <p className="text-lg text-green-700 mb-2"><strong>Confianza:</strong> {prediction.confianza}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                  <h4 className="text-xl font-semibold text-green-900 mb-2">🧴 Recomendación:</h4>
                  <p className="text-green-800 leading-relaxed">{prediction.recomendacion}</p>
                </div>
              </>
            )}

            <button
              onClick={handleReset}
              className="mt-6 w-full px-6 py-4 bg-yellow-500 text-green-900 font-semibold rounded-full transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:scale-105"
            >
              Analizar otra planta
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
