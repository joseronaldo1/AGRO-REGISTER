
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InicioSesionPage } from './pages';
import { RegistroPage } from './pages';
import { EditarPerfilUsuarioPage } from './pages';
import { OlvidopassonePage } from './pages';
import { OlvidopasstwoPage } from './pages';
import { OlvidopasstreePage } from './pages';
import { FincaPage } from './pages';
import { UsuarioPage } from './pages';
import { VariedadPage } from './pages';
import { CultivosPage } from './pages';
import { ActividadPage } from './pages';
import { LotesPage } from './pages';
import { RecursosPage } from './pages';
import { SoportePage } from './pages';
import { DashboardPage } from './pages';
import { ReportesPage } from './pages';
import { ProgramacionPage } from './pages';
import { ProduccionPage } from './pages';
import { PerfilprincipalPage } from './pages';
import ProtectedRoute from './pages/ProteccionRuta';
import { AuthProvider } from './pages/AuthContext';



function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesionPage />} />
        <Route path="/registrarse" element={<RegistroPage />} />
        <Route path="/login" element={<InicioSesionPage />} /> {/* Agrega la ruta de login */}
        <Route path="/olvidocontra1" element={<OlvidopassonePage />} />
        <Route path="/olvidocontra2" element={<OlvidopasstwoPage />} />
        <Route path="/olvidocontra3" element={<OlvidopasstreePage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <EditarPerfilUsuarioPage />
          </ProtectedRoute>
        } />
        <Route path="/finca" element={
          <ProtectedRoute>
            <FincaPage />
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <UsuarioPage />
          </ProtectedRoute>
        } />
        <Route path="/variedad" element={
          <ProtectedRoute>
            <VariedadPage />
          </ProtectedRoute>
        } />
        <Route path="/cultivo" element={
          <ProtectedRoute>
            <CultivosPage />
          </ProtectedRoute>
        } />
        <Route path="/actividad" element={
          <ProtectedRoute>
            <ActividadPage />
          </ProtectedRoute>
        } />
        <Route path="/lotes" element={
          <ProtectedRoute>
            <LotesPage />
          </ProtectedRoute>
        } />
        <Route path="/recursos" element={
          <ProtectedRoute>
            <RecursosPage />
          </ProtectedRoute>
        } />
        <Route path="/soporte" element={
          <ProtectedRoute>
            <SoportePage />
          </ProtectedRoute>
        } />
        <Route path="/reportes" element={
          <ProtectedRoute>
            <ReportesPage />
          </ProtectedRoute>
        } />
        <Route path="/programacion" element={
          <ProtectedRoute>
            <ProgramacionPage />
          </ProtectedRoute>
        } />
        <Route path="/produccion" element={
          <ProtectedRoute>
            <ProduccionPage />
          </ProtectedRoute>
        } />
        <Route path="/perfilprincipal" element={
          <ProtectedRoute>
            <PerfilprincipalPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

