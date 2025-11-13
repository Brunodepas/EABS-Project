    import { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import loginImage from "../assets/register.jpg";

    export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !nickname || !email || !password || !confirmPassword) {
            alert("Por favor, completa todos los campos necesarios.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no son iguales.");
            return;
        }

        navigate("/image-upload");
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/**Imagen */}
        <div className="relative w-[60%] h-screen">
            <img
            src={loginImage}
            alt="Imagen de registro"
            className="absolute inset-0 w-full h-full object-cover object-[90%_center]"
            />
        </div>

        {/**Formulario */}
        <div className="w-[40%] bg-[#8DA491] flex items-center justify-center">
            <form
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-xl shadow-md w-80 transform transition duration-200 hover:scale-100"
            >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#475439]">
                Crear Cuenta
            </h2>

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border rounded bg-white-50"
            />

            <input
                type="text"
                placeholder="Apellido"
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                className="w-full p-2 mb-4 border rounded bg-white-50"
            />

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

            <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded bg-white-50"
            />

            <button
                type="submit"
                className="w-full bg-[#48553B] text-white py-2 rounded hover:bg-[#15803D] transition"
            >
                Registrarme
            </button>

            <div className="text-sm mt-4 text-center">
                ¿Ya tenés cuenta?
                <Link to="/login" className="text-[#166534] hover:underline ml-1">
                Iniciar sesión
                </Link>
            </div>
            </form>
        </div>

        </div>
    );
    }
