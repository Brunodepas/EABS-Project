// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    //Ver esto conectar con el backend
    if (email && password) {
      navigate("/image-upload");
    } else {
      alert("Por favor, completá los campos.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin} // esto hace que handleLogin se ejecute al apretar "Entrar"
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email} // conecta el estado
          onChange={(e) => setEmail(e.target.value)} // actualiza el estado
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password} // conecta el estado
          onChange={(e) => setPassword(e.target.value)} // actualiza el estado
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit" // importante: dispara onSubmit del form
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <div className="text-sm mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="text-sm mt-2 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Crear una cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
