import React from "react";
import { Leaf, Image, History, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Aside.css";

export default function Aside() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", 
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between items-center py-6 z-50">
      <div className="flex flex-col items-center gap-10">

        {/* Logo */}
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigate("/image-upload")}>
          <div className="bg-green-200 rounded-full p-3 shadow-sm group-hover:scale-110 transition">
            <Leaf className="text-green-700 w-7 h-7" />
          </div>
          <span className="text-xs text-green-900 mt-2 font-bold">EABS</span>
        </div>

        {/* Botones */}
        <nav className="flex flex-col items-center gap-6 w-full">

          {/* Subir foto */}
          <button onClick={() => navigate("/image-upload")} className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition">
            <Image className="w-6 h-6" />
            <span className="absolute left-20 top-1/2 -translate-y-1/2 
              bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Diagnóstico
            </span>
          </button>

          {/* Historial */}
          <button onClick={() => navigate("/history")} className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition">
            <History className="w-6 h-6" />
            <span className="absolute left-20 top-1/2 -translate-y-1/2 
              bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Historial de Diagnósticos
            </span>
          </button>

          {/* Cuenta */}
          <button onClick={() => navigate("/cuenta")} className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition">
            <User className="w-6 h-6" />
            <span className="absolute left-20 top-1/2 -translate-y-1/2 
              bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cuenta
            </span>
          </button>

          {/* Logout */}
          <button onClick={handleLogout} className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition">
            <LogOut className="w-6 h-6" />
            <span className="absolute left-20 top-1/2 -translate-y-1/2 
              bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cerrar sesión
            </span>
          </button>

        </nav>
      </div>

      {/* Configuración */}
      <button onClick={() => navigate("/configuracion")} className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition mb-4">
        <Settings className="w-6 h-6" />
        <span className="absolute left-20 top-1/2 -translate-y-1/2 
          bg-gray-900 text-white text-xs px-2 py-1 rounded-md 
          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Configuración
        </span>
      </button>
    </aside>
  );
}
