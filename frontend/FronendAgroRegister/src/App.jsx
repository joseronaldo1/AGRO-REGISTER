import 'bootstrap/dist/css/bootstrap.min.css';
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
import Actividad from './pages/Actividades.jsx';
import { Perfilprincipal } from './pages/Perfil.jsx';

function App() {

  return (
    <BrowserRouter>    
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
          <Route path="/actividad" element={<Actividad/>} />
          <Route path="/lotes" element={<Lotes/>} />
          <Route path="/recursos" element={<Recursos/>} />
          <Route path="/Soport" element={<Soporte />} />
          <Route path="/dashboard" element={<Dashboardkev />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/programacion" element={<Programacion />} />
          <Route path="/Perfilprincipal" element={<Perfilprincipal />} />
        </Routes>

    </BrowserRouter>
  )
}

export default App;
