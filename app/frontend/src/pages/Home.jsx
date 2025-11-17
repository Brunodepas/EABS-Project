import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#f4f5f0] overflow-x-hidden">
      
      {/* Para compensar el aside*/}
      <div className="ml-[80px]"> 

        <section className="relative w-full min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
          <img
            src="/assets/home.jpg"
            alt="Decoración"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-3xl px-6">
            <h1 className="text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3 drop-shadow-xl">
              EABS - Analizador de Imágenes
            </h1>

            <p className="text-lg text-gray-100 mb-8 leading-relaxed drop-shadow-md">
              Analizamos imágenes de hojas usando inteligencia artificial para detectar posibles enfermedades.
              Si encontramos algo, te mostramos el diagnóstico y la recomendación.
            </p>

            <button
              className="bg-green-600 text-white text-lg px-8 py-3 rounded-xl shadow-md hover:bg-green-700 transition"
              onClick={() => navigate("/image-upload")}
            >
              Analizar una imagen
            </button>
          </div>
        </section>
        <section className="bg-[#61754B] py-16 px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-5">
              ¿Por qué elegir EABS?
            </h2>
            <p className="text-[#dce6ce] max-w-xl mx-auto">
              Te ofrecemos precisión, velocidad y un análisis completo en segundos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-2">
            <div className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-[1.03] transition duration-300">
              <img
                src="/assets/home1.jpg"
                alt="Ejemplo análisis"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">Detección precisa</h3>
                <p className="text-gray-600">
                  IA entrenada para reconocer patrones de enfermedades en hojas.
                </p>
              </div>
            </div>
            <div className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-[1.03] transition duration-300">
              <img
                src="/assets/home2.jpg"
                alt="Diagnóstico"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">Recomendaciones útiles</h3>
                <p className="text-gray-600">
                  Te sugerimos cómo tratar la enfermedad detectada.
                </p>
              </div>
            </div>
            <div className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-[1.03] transition duration-300">
              <img
                src="/assets/home3.jpg"
                alt="Historial"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">Historial de análisis</h3>
                <p className="text-gray-600">
                  Guarda y revisa tus análisis cuando quieras.
                </p>
              </div>
            </div>

          </div>
        </section>
        <footer className="bg-[#2e3824] text-gray-300 py-8 px-6 mt-0">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm leading-relaxed">
              Este proyecto utiliza inteligencia artificial para detectar enfermedades en hojas.
              Desarrollado para la materia <span className="text-white font-semibold">Proyecto</span>.
            </p>

            <p className="text-sm mt-2">
              Realizado por:  
              <span className="text-white font-semibold"> Emiliano Bernal</span>, 
              <span className="text-white font-semibold"> Agustin Cesari</span>, 
              <span className="text-white font-semibold"> Bruno De Pasquale</span> y
              <span className="text-white font-semibold"> Samuel Quintero</span>.
            </p>

            <div className="mt-4 text-xs text-gray-400">
              © {new Date().getFullYear()} EABS — Todos los derechos reservados.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
