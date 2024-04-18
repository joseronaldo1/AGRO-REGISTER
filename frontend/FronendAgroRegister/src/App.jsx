
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { IniciarSesion } from './pages/InicioSesion.jsx';
import { Registro } from './pages/Registro.jsx';
import Soporte from '../src/pages/Soporte.jsx'
import Dashboardkev from './pages/Dashboarkev.jsx';
import InicioF from './pages/Inicio.jsx';
import Cultivos from './pages/CultivosOfi.jsx';
import Finca from './pages/fincas.jsx';
import { Olvidopassone } from './pages/OlvidoContrase1.jsx';
import { Olvidopasstwo } from './pages/OlvidoContrase2.jsx';
import { Olvidopasstree } from './pages/OlvidoContrase3.jsx';
import Usuario from './pages/Usuarios.jsx';
import Reportes from './pages/Reportes.jsx';
import Programacion from './pages/Programacion.jsx';
import { EditarPerfilusuario } from './pages/EditarPerfilUsuario.jsx';
import Variedad from './pages/Variedad.jsx';
import Lotes from './pages/Lotes.jsx';
import Recursos from './pages/Recursos.jsx';

import { Perfilprincipal } from './pages/Perfil.jsx';
import Actividad from './pages/Actividades.jsx';

=======
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
import { PerfilprincipalPage } from './pages';
>>>>>>> 47df5508d50b2fe2e60452fb6748bb8c75628ab8

function App() {
  return (
    <BrowserRouter>    
<<<<<<< HEAD
    {/*   <Sidebar /> */}
        <Routes>
          <Route path="/" element={<InicioF />} />
          <Route path="/iniciosesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registro />} />
          <Route path="/perfil" element={<EditarPerfilusuario />} />
          <Route path="/olvidocontra1" element={<Olvidopassone/>} />
          <Route path="/olvidocontra2" element={<Olvidopasstwo/>} />
          <Route path="/olvidocontra3" element={<Olvidopasstree/>} />
          <Route path="/finca" element={<Finca/>} />
          <Route path="/usuarios" element={<Usuario/>} />
          <Route path="/variedad" element={<Variedad/>} />
          <Route path="/cultivo" element={<Cultivos/>} />
          <Route path="/actividad" element={<Actividad    />} />
          <Route path="/lotes" element={<Lotes/>} />
          <Route path="/recursos" element={<Recursos/>} />
          <Route path="/Soport" element={<Soporte />} />
          <Route path="/dashboard" element={<Dashboardkev />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/programacion" element={<Programacion />} />
          <Route path="/Perfilprincipal" element={<Perfilprincipal />} />
        </Routes>

=======
      <Routes>
        <Route path="/" element={<InicioSesionPage />} />
        <Route path="/registrarse" element={<RegistroPage />} />
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
        <Route path="/Soport" element={<SoportePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/programacion" element={<ProgramacionPage />} />
        <Route path="/Perfilprincipal" element={<PerfilprincipalPage />} />
      </Routes>
>>>>>>> 47df5508d50b2fe2e60452fb6748bb8c75628ab8
    </BrowserRouter>
  );
}

export default App;

