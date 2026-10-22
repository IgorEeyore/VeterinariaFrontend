
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";

import Inicio from "./paginas/Inicio";
import Nosotros from "./paginas/Nosotros";
import Catalogo from "./paginas/Catalogo";
import Novedades from "./paginas/Novedades";
import Contacto from "./paginas/Contacto";
import Login from "./paginas/login";
import Registro from "./paginas/Registro";
import Carrito from "./paginas/Carrito";
import Admin from "./paginas/Admin";
import AdminCatalogo from "./paginas/Admin-Catalogo";
import AdminUsuarios from "./paginas/Admin-Usuarios";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* Barra de navegación */}
        <Navbar />

        {/* Páginas */}
        <main className="app-contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/catalogo" element={<AdminCatalogo />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          </Routes>
        </main>

        {/* Pie de página */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
