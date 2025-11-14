import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [allowed, setAllowed] = useState(null); 
  useEffect(() => {
    fetch("http://localhost:5000/me", {
      method: "POST",
      credentials: "include" 
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setAllowed(false);
        else setAllowed(true);
      })
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) {
    return (
      <div className="w-full text-center p-10 text-green-700">
        Cargando...
      </div>
    );
  }

  return allowed ? children : <Navigate to="/login" replace />;
}
