import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./components/MainLayout";
import ImageUpload from "./pages/ImageUpload";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";

import PrivateRoute from "./routes/PrivateRoute";

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
            <PrivateRoute>
              <MainLayout>
                <ImageUpload />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <MainLayout>
                <History />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/history/:id"
          element={
            <PrivateRoute>
              <MainLayout>
                <HistoryDetail />
              </MainLayout>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
