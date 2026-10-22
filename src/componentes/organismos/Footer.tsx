
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-white py-4 mt-auto"
      style={{ backgroundColor: "#202747" }}
    >
      <div className="container">
        <div className="row gy-4">

          {/* Información general */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">
              🐾 Veterinaria San Marcos
            </h5>

            <p className="text-white-50">
              Más de 10 años dedicados al cuidado
              y bienestar de perros, gatos y
              animales exóticos.
            </p>

            <p className="text-white-50">
              Consultas veterinarias, cirugías,
              vacunación, desparasitación y peluquería.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">
              Enlaces rápidos
            </h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-enlace">
                  Inicio
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/catalogo" className="footer-enlace">
                  Catálogo
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/novedades" className="footer-enlace">
                  Novedades
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/nosotros" className="footer-enlace">
                  Nosotros
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/contacto" className="footer-enlace">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Datos reales de contacto */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Contacto</h5>

            <p className="mb-2">
              📍 Av. Los Zapadores 904,
              Región Metropolitana, Chile.
            </p>

            <p className="mb-2">
              📞{" "}
              <a
                href="tel:+56936726204"
                className="footer-enlace"
              >
                +56 9 3672 6204
              </a>
            </p>

            <p className="mb-2">
              ✉️{" "}
              <a
                href="mailto:veterinariasm@sanmarcos.cl"
                className="footer-enlace"
              >
                veterinariasm@sanmarcos.cl
              </a>
            </p>

            <p
              className="fw-bold mt-3"
              style={{ color: "#20C997" }}
            >
              Urgencias veterinarias 24/7
            </p>

            <p className="small text-white-50">
              Para horarios regulares y precios,
              consulta directamente con la veterinaria.
            </p>

            <Link
              to="/contacto"
              className="btn btn-outline-light btn-sm mt-2"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-white-50">
          <small>
            © {new Date().getFullYear()} Veterinaria San Marcos.
            Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
