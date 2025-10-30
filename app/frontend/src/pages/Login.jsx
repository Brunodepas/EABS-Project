// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login1.jpg"; // ajustá ruta

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate("/image-upload");
    } else {
      alert("Por favor, completá los campos.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 65% - Lado blanco */}
      <div className="w-[40%] bg-[#61754B] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-80 transform transition duration-200 hover:scale-105"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#166534]">
            Iniciar Sesión
          </h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-yellow-50"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-yellow-50"
          />

          <button
            type="submit"
            className="w-full bg-[#16A34A] text-white py-2 rounded hover:bg-[#15803D] transition"
          >
            Entrar
          </button>

          <div className="text-sm mt-4 text-center">
            <Link to="/forgot-password" className="text-[#166534] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="text-sm mt-2 text-center">
            <Link to="/register" className="text-[#166534] hover:underline">
              No tienes una cuenta?
            </Link>
          </div>
        </form>
      </div>

      {/* 35% - Imagen de fondo */}
      <div className="relative w-[60%] h-screen">
        <img
          src={loginImage}
          alt="Imagen de bienvenida"
          className="absolute inset-0 w-full h-full object-cover object-[90%_center]"
        />
      </div>
    </div>
  );
}
