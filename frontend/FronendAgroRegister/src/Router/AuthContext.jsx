import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'; // Asegúrate de instalar jwt-decode

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Solo verifica el token cuando el componente se monta por primera vez
    if (token) {
      const verifyToken = async () => {
        try {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now().valueOf() / 1000;

          if (decodedToken.exp * 1000 < currentTime) {
            // El token ha expirado
            localStorage.removeItem('token');
            setToken('');
            window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
          localStorage.removeItem('token');
          setToken('');
          window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
        }
      };

      verifyToken();
    }
  }, []); // Nota: No hay dependencias, por lo que este efecto solo se ejecuta al montar

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
