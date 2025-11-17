import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login1.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password){
      alert("Completa todos los campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Ingresá un email válido.");
      return;
    }

    try{
      const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",   //Lo que hace esto es guardar la cookie en el browser
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if(!res.ok){
      alert(data.error || "Error iniciando sesion");
      return;
    }

    
    const meRes = await fetch("http://localhost:5000/me", {
      method: "POST",
      credentials: "include",
    });
    const meData = await meRes.json();

    if (meData.profile_image) {
      localStorage.setItem("profileImage", meData.profile_image);
    } else {
      localStorage.removeItem("profileImage");
    }
    
    navigate("/home");//Ruta ya protegida
     }catch(err){
      console.error(err);
      alert("Error conectando al servidor");
     }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[40%] bg-[#61754B] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          noValidate
          className="bg-white p-10 rounded-xl shadow-md w-96 transform transition duration-200 hover:scale-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#166534]">
            Iniciar Sesión
          </h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-white-50"
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
              ¿No tienes una cuenta?
            </Link>
          </div>
        </form>
      </div>

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
