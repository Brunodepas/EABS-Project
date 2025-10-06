import { useState, useRef } from "react"; //useRef para resetear input
import { Upload, Leaf, Activity } from "lucide-react"; //Iconos

function ImageUpload() {
  // Estados del componente
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref para resetear el input file
  const fileInputRef = useRef(null);

  /**
   * Cuando se sube una imagen, se convierte en texto, se guarda en el estado
   * y luego se muestran los resultados
   */
  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();
        setPrediction(data.result || data.error);
      } catch (error) {
        console.error("Error enviando la imagen:", error);
        setPrediction("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
        setShowResults(true);
      }
    };

    reader.readAsDataURL(file);
  };

  /**
   * Maneja el arrastre de archivo
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  /**
   * Maneja la selección desde input
   */
  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  /**
   * Reset del formulario e input
   */
  const handleReset = () => {
    setSelectedImage(null);
    setShowResults(false);
    setPrediction(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-0 via-emerald-0 to-teal-0 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-green-200 opacity-50 animate-float">
          <Leaf size={80} />
        </div>
        <div className="absolute top-40 right-20 text-green-300 opacity-50 animate-float-delayed">
          <Leaf size={60} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-emerald-200 opacity-50 animate-float">
          <Leaf size={70} />
        </div>
        <div className="absolute bottom-40 right-1/3 text-green-200 opacity-50 animate-float-delayed">
          <Leaf size={50} />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-12 pb-8">
        <h1 className="text-6xl font-bold text-green-900 mb-4 flex items-center justify-center gap-3">
          EABS
          <span className="text-5xl">🌱</span>
        </h1>
        <p className="text-xl text-green-800 font-medium">
          Detecta enfermedades en tus plantas fácilmente
        </p>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {/* Upload */}
        <div className="mb-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`bg-white rounded-3xl shadow-lg p-12 border-4 border-dashed transition-all duration-300 ${
              isDragging
                ? "border-green-500 bg-green-50 scale-105"
                : "border-green-200 hover:border-green-300"
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Upload className="text-green-600" size={40} />
              </div>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">
                Sube una foto de tu planta
              </h2>
              <p className="text-green-600 mb-6">
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
                <span className="px-8 py-4 bg-yellow-500 text-green-900 font-semibold rounded-full cursor-pointer inline-block transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-300/50 hover:scale-105">
                  Seleccionar imagen
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Imagen cargada */}
        {selectedImage && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-green-300">
              <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
                <Leaf className="text-green-600" size={24} />
                Imagen cargada
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
                  <Activity
                    className="text-green-600 mx-auto mb-4 animate-spin"
                    size={40}
                  />
                  <p className="text-green-800 font-medium">
                    Analizando imagen...
                  </p>
                </>
              ) : (
                <>
                  <Activity className="text-green-600 mx-auto mb-4" size={40} />
                  <p className="text-green-800 font-medium">
                    Resultado:{" "}
                    {JSON.stringify(prediction) || "No se obtuvo resultado"}
                  </p>
                </>
              )}
              <button
                onClick={handleReset}
                className="mt-6 w-full px-6 py-4 bg-yellow-500 text-green-900 font-semibold rounded-full transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-300/50 hover:scale-105"
              >
                Analizar otra planta
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 mt-12 text-green-900 border-t border-green-200">
        <p className="text-sm font-medium">
          © 2025 EABS — Innovación para el cuidado de tus plantas
        </p>
      </footer>
    </div>
  );
}

export default ImageUpload;
