import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Button
} from "react-bootstrap";

interface NavbarProps {
  esAdmin?: boolean;
}

function Navbar({ esAdmin = false }: NavbarProps) {
  const [mostrarAdmin, setMostrarAdmin] = useState(false);

  return (
    <>
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
              Catálogo
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
                Iniciar sesión
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/registro">
                Registrarse
              </NavDropdown.Item>
            </NavDropdown>

            {esAdmin && (
              <Button
                variant="outline-light"
                onClick={() => setMostrarAdmin(true)}
                aria-label="Abrir administración"
              >
                ☰
              </Button>
            )}

          </Nav>
        </Container>
      </BootstrapNavbar>

      {esAdmin && (
        <Offcanvas
          show={mostrarAdmin}
          onHide={() => setMostrarAdmin(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Administración
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column gap-3">
              <Nav.Link
                as={Link}
                to="/admin"
                onClick={() => setMostrarAdmin(false)}
              >
                Panel principal
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/admin/catalogo"
                onClick={() => setMostrarAdmin(false)}
              >
                Administrar catálogo
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/admin/usuarios"
                onClick={() => setMostrarAdmin(false)}
              >
                Administrar usuarios
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
}

export default Navbar;