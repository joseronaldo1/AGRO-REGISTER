import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert('Tienes que iniciar sesión primero')
      navigate('/')
    }
  }, [auth, navigate]);

  if (!auth) {
    return null;
  }

  return <Outlet />;
}

export default ProtectedRoute;