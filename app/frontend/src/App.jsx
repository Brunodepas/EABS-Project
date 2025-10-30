//Esto trae las herramientas principales de React Router, la libreria que permite navegar entre distintas pags
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import ImageUpload from "./pages/ImageUpload";
//import Register from "./pages/Register";
//import ForgotPassword from "./pages/ForgotPassword";
//import History from "./pages/History";
//import Account from "./pages/Account";
//import Config from "./pages/Config";

//Función para proteger rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function app() {
  return(
    <Router>
      <Routes>
        
        {/*Rutas publicas*/}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        {/*Rutas Privadas */}
        
        <Route
          path="/image-upload"
          element={
            <MainLayout>
              <ImageUpload />
            </MainLayout>
          }
        />
        
        {/* <Route */}
          {/* path="/history" */}
          {/* element={ */}
            {/* <MainLayout> */}
              {/* <History /> */}
            {/* </MainLayout> */}
          {/* } */}
        {/* /> */}
        
        {/* <Route */}
          {/* path="/cuenta" */}
          {/* element={ */}
            {/* <PrivateRoute> */}
              {/* <MainLayout> */}
                {/* <Cuenta /> */}
              {/* </MainLayout> */}
            {/* </PrivateRoute> */}
          {/* } */}
        {/* /> */}

        {/* <Route */}
          {/* path="/configuracion" */}
          {/* element={ */}
            {/* <PrivateRoute> */}
              {/* <MainLayout> */}
                {/* <Configuracion /> */}
              {/* </MainLayout> */}
            {/* </PrivateRoute> */}
          {/* } */}
        {/* /> */}
      
      </Routes>
    </Router>
  );
}

export default app;