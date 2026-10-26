import { Link } from "react-router-dom"

function Admin() {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold" style={{ color: "#2D3161" }}>
          Panel de Control
        </h1>
        <p className="text-muted">Gestion interna de Veterinaria San Marcos</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4 p-4 text-center">
            <div className="card-body">
              <div className="display-4 mb-3">📦</div>
              <h3 className="fw-bold mb-3" style={{ color: "#2ec4b6" }}>
                Gestion de Catalogo
              </h3>
              <p className="text-muted mb-4">
                Administra los productos, servicios y precios del catalogo.
              </p>
              <Link
                to="/admin/catalogo"
                className="btn text-white fw-bold px-4 py-2"
                style={{ backgroundColor: "#2ec4b6" }}
              >
                Ir a Catalogo
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4 p-4 text-center">
            <div className="card-body">
              <div className="display-4 mb-3">👥</div>
              <h3 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
                Gestion de Usuarios
              </h3>
              <p className="text-muted mb-4">
                Administra las cuentas de clientes y roles del sistema.
              </p>
              <Link
                to="/admin/usuarios"
                className="btn text-white fw-bold px-4 py-2"
                style={{ backgroundColor: "#2D3161" }}
              >
                Ir a Usuarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin