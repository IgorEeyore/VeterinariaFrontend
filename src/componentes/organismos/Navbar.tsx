import { Link, NavLink } from "react-router-dom"
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown
} from "react-bootstrap"

function Navbar() {
  return (
    <BootstrapNavbar
      style={{ backgroundColor: "#2D3161" }}
      variant="dark"
      className="py-3"
    >
      <Container className="d-flex flex-wrap gap-3">
        <BootstrapNavbar.Brand as={Link} to="/">
          🐾 Veterinaria San Marcos
        </BootstrapNavbar.Brand>

        <Nav className="ms-lg-auto flex-row flex-wrap align-items-center gap-2 gap-lg-3">
          <Nav.Link as={NavLink} to="/" end>
            Inicio
          </Nav.Link>

          <Nav.Link as={NavLink} to="/catalogo">
            Catalogo
          </Nav.Link>

          <Nav.Link as={NavLink} to="/novedades">
            Novedades
          </Nav.Link>

          <Nav.Link as={NavLink} to="/nosotros">
            Nosotros
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/carrito"
            title="Ver carrito"
            aria-label="Ver carrito"
          >
            🛒
          </Nav.Link>

          <NavDropdown
            title="👤 Cuenta"
            id="menu-cuenta"
            align="end"
            menuVariant="light"
          >
            <NavDropdown.Item as={Link} to="/login">
              Iniciar sesion
            </NavDropdown.Item>

            <NavDropdown.Item as={Link} to="/registro">
              Registrarse
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar