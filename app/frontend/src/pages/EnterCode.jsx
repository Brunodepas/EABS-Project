import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login1.jpg";

export default function EnterCode() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      alert("Completá ambos campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Ingresá un email válido.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/validate-code", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Código incorrecto.");
        return;
      }

      alert("Código validado correctamente.");
      
      navigate("/reset-password", { state: { email } });


    } catch (err) {
      console.error(err);
      alert("Error verificando código.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* FORMULARIO IZQUIERDA */}
      <div className="w-[40%] bg-[#61754B] flex items-center justify-center">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-xl shadow-md w-96 transform transition duration-200 hover:scale-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#166534]">
            Ingresar Código
          </h2>

          <p className="text-center text-gray-600 mb-4">
            Te enviamos un código de 6 dígitos a tu correo. Ingresalo aquí.
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
          />

          {/* CODIGO */}
          <input
            type="text"
            maxLength={6}
            placeholder="Código de 6 dígitos"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
          />

          <button
            type="submit"
            className="w-full bg-[#16A34A] text-white py-2 rounded hover:bg-[#15803D] transition"
          >
            Validar código
          </button>

          <div className="text-sm mt-4 text-center">
            <Link to="/forgot-password" className="text-[#166534] hover:underline">
              Volver atrás
            </Link>
          </div>
        </form>
      </div>

      {/* IMAGEN DERECHA */}
      <div className="relative w-[60%] h-screen">
        <img
          src={loginImage}
          alt="Imagen"
          className="absolute inset-0 w-full h-full object-cover object-[90%_center]"
        />
      </div>
    </div>
  );
}
