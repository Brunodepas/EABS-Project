import React, { useEffect, useState } from "react";
import { Leaf, Image, Library, History, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Aside.css";

export default function Aside() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage"));

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("profileImage");
      if (stored !== profileImage) {
        setProfileImage(stored);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [profileImage]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between items-center py-6 z-50">
      <div className="flex flex-col items-center gap-10">

        {/* Logo dinámico basado en la foto de perfil */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => navigate("/image-upload")}
        >
          <div className="bg-green-200 rounded-full p-1 shadow-sm group-hover:scale-110 transition w-14 h-14 flex items-center justify-center overflow-hidden">

            {profileImage ? (
              <img
                src={`/src/assets/profile/${profileImage}.jpg`}
                alt="Perfil"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Leaf className="text-green-700 w-7 h-7" />
            )}

          </div>

          <span className="text-xs text-green-900 mt-2 font-bold">EABS</span>
        </div>

        {/* Botones */}
        <nav className="flex flex-col items-center gap-6 w-full">

          {/* Subir foto */}
          <button
            onClick={() => navigate("/image-upload")}
            className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition"
          >
            <Image className="w-6 h-6" />
          </button>

          {/* Historial */}
          <button
            onClick={() => navigate("/history")}
            className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition"
          >
            <History className="w-6 h-6" />
          </button>

          {/* Cuenta */}
          <button
            onClick={() => navigate("/account")}
            className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition"
          >
            <User className="w-6 h-6" />
          </button>

          {/* Biblioteca */}
          <button
            onClick={() => navigate("/library")}
            className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition"
          >
            <Library className="w-6 h-6" />
          </button>

        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="relative group flex flex-col items-center w-full py-3 rounded-xl hover:scale-110 transition"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </aside>
  );
}
