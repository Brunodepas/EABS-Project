import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginImage from "../assets/login1.jpg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;  // viene de EnterCode

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      alert("Completá todos los campos.");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error actualizando contraseña.");
        return;
      }

      alert("Contraseña actualizada correctamente.");
      navigate("/login");

    } catch (err) {
      alert("Error conectando al servidor.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">

      <div className="w-[40%] bg-[#61754B] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#166534]">
            Restablecer Contraseña
          </h2>

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
          />

          <button
            type="submit"
            className="w-full bg-[#16A34A] text-white py-2 rounded hover:bg-[#15803D] transition"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>

      <div className="relative w-[60%] h-screen">
        <img src={loginImage} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
}
