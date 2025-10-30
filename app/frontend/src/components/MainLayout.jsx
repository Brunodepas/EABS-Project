import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


function LeafIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12z" />
      <path d="M9 14c1-1 3-2 6-4" />
    </svg>
  );
}


// 🌿 Silueta simple de planta/árbol
function PlantSilhouette({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 58V34"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 38c6-2 8-6 12-12 4 6 6 10 12 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 28c4-1 7-3 9-7 2 4 5 6 9 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Fondo natural con hojas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 🌿 Hojas grandes */}
        <LeafIcon className="absolute -top-10 left-10 w-32 h-32 text-green-300 opacity-50 animate-float-slow rotate-6" />
        <LeafIcon className="absolute top-16 right-20 w-24 h-24 text-emerald-300 opacity-50 animate-float -rotate-6" />

        {/* 🌿 Hojas medias */}
        <LeafIcon className="absolute top-1/3 left-6 w-16 h-16 text-green-300 opacity-40 animate-float-sway rotate-12" />
        <LeafIcon className="absolute top-1/2 right-10 w-20 h-20 text-teal-300 opacity-40 animate-float-sway-rev -rotate-12" />

        {/* 🌿 Hojas bajas */}
        <LeafIcon className="absolute bottom-24 left-1/4 w-24 h-24 text-emerald-300 opacity-50 animate-float" />
        <LeafIcon className="absolute bottom-16 right-1/3 w-28 h-28 text-green-200 opacity-60 animate-float-slow -rotate-3" />

        {/* 🌱 Plantas suaves (parallax) */}
        <PlantSilhouette className="absolute bottom-8 left-8 w-24 h-24 text-green-200/40 animate-parallax" />
        <PlantSilhouette className="absolute bottom-10 right-8 w-28 h-28 text-teal-200/40 animate-parallax-rev" />
      </div>

      {/* Navbar fijo arriba */}
      <Navbar />

      {/* Contenido con separación visible */}
      <main className="relative z-10 flex-grow flex justify-center items-start px-4 pt-28 pb-8 transition-all duration-300">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
