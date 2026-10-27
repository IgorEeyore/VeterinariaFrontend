import FormularioContacto from "../componentes/organismos/FormularioContacto"

function Contacto() {
  return (
    <div className="container py-5">
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#2D3161" }}
      >
        Contacto
      </h1>

      <p className="text-center mb-5">
        Comunicate con Veterinaria San Marcos para consultar por
        servicios, horarios y precios.
      </p>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold" style={{ color: "#2D3161" }}>
                Informacion de contacto
              </h2>

              <p className="mt-3">
                <strong>Direccion:</strong>
                <br />
                Av. Los Zapadores 904,
                Region Metropolitana, Chile.
              </p>

              <p>
                <strong>Telefono:</strong>
                <br />
                <a href="tel:+56936726204" className="text-decoration-none">
                  +56 9 3672 6204
                </a>
              </p>

              <p>
                <strong>Correo:</strong>
                <br />
                <a href="mailto:veterinariasm@sanmarcos.cl" className="text-decoration-none">
                  veterinariasm@sanmarcos.cl
                </a>
              </p>

              <p className="fw-bold text-success">
                Urgencias veterinarias 24/7
              </p>

              <p className="text-muted small mb-0">
                Los horarios regulares de atencion no estan
                especificados. Consulta directamente por
                disponibilidad y precios.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold" style={{ color: "#2D3161" }}>
                Donde estamos?
              </h2>

              <p className="mt-3">
                Encuentranos en Av. Los Zapadores 904,
                Region Metropolitana, Chile.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Los+Zapadores+904%2C+Chile"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary fw-semibold mb-3"
              >
                Ver ubicacion en Google Maps
              </a>

              <hr />

              <p className="mb-0 text-muted small">
                Para consultas sobre nuestros servicios puedes
                llamar, escribirnos por correo o completar el formulario a continuacion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FormularioContacto />
    </div>
  )
}

export default Contacto