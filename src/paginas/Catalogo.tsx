import ListadoCatalogo from "../componentes/organismos/ListadoCatalogo"

function Catalogo() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#2D3161" }}>
          Catalogo de Servicios y Productos
        </h1>
        <p className="text-muted">
          Atencion medica, estetica y cuidados especializados para tus mascotas
        </p>
      </div>

      <ListadoCatalogo />
    </div>
  )
}

export default Catalogo