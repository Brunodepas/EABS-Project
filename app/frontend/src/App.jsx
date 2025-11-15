import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EnterCode from "./pages/EnterCode";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import ImageUpload from "./pages/ImageUpload";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import Account from "./pages/Account";
import PrivateRoute from "./routes/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Rutas privadas */}
        
        {/*Diagnostico */}
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

        {/*Historial*/}
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

        {/*Cuenta*/}
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <MainLayout>
                <Account />
              </MainLayout>
            </PrivateRoute>
          }
        />



      </Routes>
    </Router>
  );
}

export default App;
