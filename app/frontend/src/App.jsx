import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import ImageUpload from "./pages/ImageUpload";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";

// Función para proteger rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/image-upload"
          element={
            <MainLayout>
              <ImageUpload />
            </MainLayout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
