import React from "react";
import { Leaf, History, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // 🔗 Importamos los estilos clásicos

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-green-100/80 border-b border-green-200/50 shadow-lg shadow-green-200/40 paper-shadow-bottom-z-2">
      <div className="container-fluid max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 navbar-body">
        
        {/* Logo con hover (no cierra sesión) */}
        <div
          className="flex items-center gap-3 cursor-pointer transform transition duration-300 hover:scale-105 hover:brightness-110 navbar-start"
        >
          <div className="bg-green-200 rounded-full p-2 shadow-sm">
            <Leaf className="text-green-700 w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-green-900 tracking-tight select-none">
            EABS <span className="text-2xl">🌱</span>
          </h1>
        </div>

        {/* Menú */}
        <nav className="navbar-end flex items-center gap-6 mt-4 md:mt-0">
          <a onClick={() => navigate("/historial")}>
            <History size={18} /> Historial
          </a>

          <a onClick={() => navigate("/cuenta")}>
            <User size={18} /> Cuenta
          </a>

          <a onClick={() => navigate("/configuracion")}>
            <Settings size={18} /> Configuración
          </a>

          <a onClick={handleLogout} className="text-red-600 hover:text-red-700">
            <LogOut size={18} /> Cerrar sesión
          </a>
        </nav>
      </div>
    </header>
  );
}
