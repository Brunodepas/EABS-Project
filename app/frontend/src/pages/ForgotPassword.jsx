import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login1.jpg";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Ingresá tu email.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Ingresá un email válido.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      alert(data.message || "Si el correo existe, enviaremos un enlace.");
      navigate("/enter-code");
    } catch (err) {
      console.error(err);
      alert("Error enviando solicitud.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[40%] bg-[#61754B] flex items-center justify-center">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#166534]">
            Recuperar Contraseña
          </h2>

          <p className="text-center text-gray-600 mb-4">
            Ingresá tu correo y te enviaremos un enlace para restablecerla.
          </p>

          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#16A34A] text-white py-2 rounded hover:bg-[#15803D] transition"
          >
            Enviar enlace
          </button>

          <div className="text-sm mt-4 text-center">
            <Link to="/login" className="text-[#166534] hover:underline">
              Volver a iniciar sesión
            </Link>
          </div>
        </form>

      </div>

      <div className="relative w-[60%] h-screen">
        <img
          src={loginImage}
          alt="Imagen"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}