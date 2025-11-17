import React from "react";
import Aside from "./Aside";
import { Leaf } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/home";
  
  return (
    <div className="min-h-screen h-auto flex flex-col relative overflow-visible bg-gradient-to-br from-[#4C8559] to-[#3C6845]">

      {/* === TEXTURA SUAVE (grain) === */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay"></div>

      {/* === HOJAS DECORATIVAS === */}
      <div className="absolute inset-0 pointer-events-none opacity-40">

        {/* === HOJAS GRANDES === */}
        <Leaf size={90} className="absolute top-14 left-20 text-white animate-float-medium" />
        <Leaf size={75} className="absolute bottom-16 right-1/4 text-[#dce7d0] animate-float-medium" />

        {/* === HOJAS MEDIANAS EXISTENTES === */}
        <Leaf size={55} className="absolute top-1/3 right-16 opacity-70 animate-sway" />
        <Leaf size={50} className="absolute bottom-1/3 left-24 text-[#e1edd9] opacity-70 animate-sway-rev" />

        {/* === HOJAS PEQUEÑAS EXISTENTES === */}
        <Leaf size={32} className="absolute top-1/2 left-1/2 text-[#eef5ea] opacity-50 animate-float-fast" />
        <Leaf size={28} className="absolute bottom-20 right-10 opacity-50 animate-float-fast" />

        {/* === HOJAS NUEVAS (MEJOR DISTRIBUIDAS) === */}

        {/* Arriba izquierda */}
        <Leaf size={40} className="absolute top-10 left-10 opacity-60 animate-sway" />

        {/* Arriba derecha */}
        <Leaf size={48} className="absolute top-20 right-14 text-[#e8f3e4] opacity-60 animate-float-medium" />

        {/* Centro derecha */}
        <Leaf size={42} className="absolute top-1/2 right-8 text-[#f0f7ec] opacity-50 animate-sway-rev" />

        {/* Centro izquierda */}
        <Leaf size={38} className="absolute top-1/2 left-12  opacity-55 animate-float-slow" />

        {/* Abajo izquierda */}
        <Leaf size={45} className="absolute bottom-20 left-16 text-[#e4efdd] opacity-55 animate-float-medium" />

        {/* Abajo derecha */}
        <Leaf size={40} className="absolute bottom-14 right-20 text-[#e4efdd] opacity-55 animate-sway" />

        {/* Muy baja izquierda */}
        <Leaf size={30} className="absolute bottom-8 left-1/3  opacity-40 animate-float-fast" />

        {/* Muy baja derecha */}
        <Leaf size={34} className="absolute bottom-6 right-1/3 text-[#f0f7ec] opacity-40 animate-float-fast" />

        {/* Centro inferior */}
        <Leaf size={50} className="absolute bottom-1/4 left-1/2 text-[#e7f2e4] opacity-50 animate-sway-rev" />
      </div>

      {/* === Aside fijo === */}
      <div className="relative z-20">
        <Aside />
      </div>

      {/* === Contenido === */}
      <main
        className={
          isHome
            ? "relative z-10 flex-grow w-full flex justify-center items-start p-0 m-0"
            : "relative z-10 flex-grow flex justify-center items-start px-6 py-16"
        }
      >
        {children}
      </main>
    </div>
  );
}
