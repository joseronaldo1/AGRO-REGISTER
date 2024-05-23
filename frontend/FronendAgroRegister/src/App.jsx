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



function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<InicioSesionPage />} />
        <Route path="/Registrarse" element={<RegistroPage />} />
        <Route path="/perfil" element={<EditarPerfilUsuarioPage />} />
        <Route path="/olvidocontra1" element={<OlvidopassonePage />} />
        <Route path="/olvidocontra2" element={<OlvidopasstwoPage />} />
        <Route path="/olvidocontra3" element={<OlvidopasstreePage />} />
        <Route path="/finca" element={<FincaPage />} />
        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/variedad" element={<VariedadPage />} />
        <Route path="/cultivo" element={<CultivosPage />} />
        <Route path="/actividad" element={<ActividadPage />} />
        <Route path="/lotes" element={<LotesPage />} />
        <Route path="/recursos" element={<RecursosPage />} />
        <Route path="/Soporte" element={<SoportePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/programacion" element={<ProgramacionPage />} />
        <Route path="/produccion" element={<ProduccionPage />} />
        <Route path="/Perfilprincipal" element={<PerfilprincipalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;