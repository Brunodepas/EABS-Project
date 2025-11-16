import React from "react";
import { Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
        <section className="relative w-full min-h-[70vh] flex items-center justify-center text-center overflow-hidden">

        {/* Imagen de fondo */}
        <img
            src="/src/assets/hero.jpg"
            alt="Decoración"
            className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Capa de oscurecimiento */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-3xl px-6">
            <h1 className="text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3 drop-shadow-lg">
            EABS - Analizador de Imágenes
            </h1>

            <p className="text-lg text-gray-100 mb-8 leading-relaxed drop-shadow-md">
            Analizamos imágenes de hojas usando inteligencia artificial para detectar posibles enfermedades.
            Si encontramos algo, te mostramos el diagnóstico y la recomendación.
            </p>

            <button
            className="bg-green-600 text-white text-lg px-8 py-3 rounded-xl shadow-md hover:bg-green-700 transition"
            onClick={() => window.location.href = '/image-upload'}
            >
            Analizar una imagen
            </button>
        </div>
        </section>

      {/* === WHY CHOOSE US === */}
      <section className="bg-[#8DA491] py-16 px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text- mb-4">
            ¿Por qué elegir EABS?
          </h2>
          <p className="text-white max-w-xl mx-auto">
            Te ofrecemos precisión, velocidad y un análisis completo en segundos.
          </p>
        </div>

        {/* Cards con imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Card 1 */}
          <div className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-[1.03] transition">
            <img
              src="/src/assets/home1.jpg"
              alt="Ejemplo análisis"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-900 mb-2">Detección precisa</h3>
              <p className="text-gray-600">
                Usamos IA entrenada para reconocer patrones de enfermedades en hojas.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-[1.03] transition">
            <img
              src="/src/assets/home2.jpg"
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
        </div>
      </section>
    </div>
  );
}
