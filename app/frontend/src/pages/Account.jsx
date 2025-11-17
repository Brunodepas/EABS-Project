import { useState, useEffect } from "react";
import { User, Mail, Key, Trash2, RotateCcw, Save, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Nuevos valores para actualizar
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Para abrir/cerrar el selector de imagen
  const [showPicker, setShowPicker] = useState(false);

  const profileOptions = ["plant1", "plant2", "plant3", "plant4", "plant5"];

  useEffect(() => {
    fetch("http://localhost:5000/me", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUsername(data.username);
          setEmail(data.email);
          setNewUsername(data.username);
          setNewEmail(data.email);
          setProfileImage(data.profile_image);
        }
      });
  }, []);

  //Restaurar historial
  const restoreHistory = () => {
    if (confirm("¿Seguro que quieres restaurar tu historial? Esta acción no se puede deshacer.")) {
      fetch("http://localhost:5000/restore-history", {
        method: "POST",
        credentials: "include",
      }) .then(res => res.json())
          .then(() => {
            alert("Historial actualizado correctamente.");
            navigate("/history"); // o donde quieras
          });
    }
  };

  //Eliminar cuenta
  const deleteAccount = () => {
    if (confirm("¿Seguro que deseas eliminar definitivamente tu cuenta?")) {
      fetch("http://localhost:5000/delete-account", {
        method: "POST",
        credentials: "include",
      }).then(() => navigate("/login"));
    }
  };

  // Guardar cambios username/email
  const saveProfile = () => {
    fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        profile_image: profileImage,
        }),
    }).then(() => {
        alert("Cambios actualizados correctamente.");
        navigate("/account");
    });

  };



  // Cambiar contraseña
  const changePassword = () => {
    fetch("http://localhost:5000/change-password", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    }).then(() => {
      setOldPassword("");
      setNewPassword("");
      alert("Contraseña actualizada correctamente.");
    });
  };

  return (
    <div className="p-6 pl-28 pr-10">
      <div className="relative flex justify-center mb-8">
        <img
            src={`/profile/${profileImage}.jpg`}
            onClick={() => setShowPicker(true)}   
            className="w-36 h-36 rounded-full border-4 border-green-500 shadow-lg object-cover
                    cursor-pointer transition duration-300 hover:opacity-40"
            alt="Foto de perfil"
        />
       </div>
      <h1 className="text-3xl font-bold text-white mb-10 flex items-center justify-center gap-3">
        Mi Cuenta
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/*Datos del perfil*/}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <User className="text-green-600" />
            Datos del perfil
          </h2>

          <div>
            <label className="text-green-800 font-semibold text-sm">Nombre de usuario</label>
            <input
              className="w-full mt-1 p-3 rounded-xl border border-green-200 outline-none"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-green-800 font-semibold text-sm">Correo electrónico</label>
            <input
              className="w-full mt-1 p-3 rounded-xl border border-green-200 outline-none"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <button
            onClick={saveProfile}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl 
                       hover:bg-green-500 transition">
            <Save size={18} /> Guardar cambios
          </button>
        </div>

        {/*Cambiar contraseña*/}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <Key className="text-green-600" />
            Cambiar contraseña
          </h2>

          <div>
            <label className="text-green-800 font-semibold text-sm">Contraseña actual</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-xl border border-green-200 outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-green-800 font-semibold text-sm">Nueva contraseña</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-xl border border-green-200 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={changePassword}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl 
                       hover:bg-green-500 transition">
            <Key size={18} /> Actualizar contraseña
          </button>
        </div>

        {/*Restaurar historial*/}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <RotateCcw className="text-green-600" />
            Restaurar historial
          </h2>

          <p className="text-green-700 text-sm">
            Esta opción eliminará todos los análisis guardados en tu historial.
          </p>

          <button
            onClick={restoreHistory}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-green-900 py-3 rounded-xl 
                       hover:bg-yellow-400 transition">
            <RotateCcw size={18} /> Restaurar historial
          </button>
        </div>

        {/*Eliminar cuenta*/}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <Trash2 className="text-red-600" />
            Eliminar cuenta
          </h2>

          <p className="text-green-700 text-sm">
            Se eliminarán todos sus datos.
          </p>

          <button
            onClick={deleteAccount}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl 
                       hover:bg-red-500 transition">
            <Trash2 size={18} /> Eliminar mi cuenta
          </button>
        </div>
      </div>

      {/*Cerrar sesion */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-green-800 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
        >
          <LogOut size={20} /> Cerrar sesión
        </button>
      </div>

      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[330px]">

            <h2 className="text-lg font-semibold text-green-900 mb-4 text-center">
              Elegí tu nueva foto
            </h2>

            <div className="grid grid-cols-5 gap-3 mb-4">
              {profileOptions.map((img) => (
                <img
                    key={img}
                    src={`/profile/${img}.jpg`}
                    onClick={() => {
                        setProfileImage(img);
                        localStorage.setItem("profileImage", img);
                        setShowPicker(false);

                        fetch("http://localhost:5000/update-profile", {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: newUsername,
                            email: newEmail,
                            profile_image: img,
                        }),
                        });
                    }}
                    className={`w-14 h-14 rounded-full cursor-pointer border-2 transition 
                        ${profileImage === img ? "border-green-600 scale-110" : "border-transparent"}
                    `}
                />
              ))}
            </div>

            <button
              onClick={() => setShowPicker(false)}
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-500 transition"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
