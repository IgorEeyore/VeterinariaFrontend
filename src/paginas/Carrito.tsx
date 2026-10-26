import ContenidoCarrito from "../componentes/organismos/ContenidoCarrito"

function Carrito() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: "#2D3161" }}>
        🛒 Carrito de Compras
      </h1>

      <ContenidoCarrito />
    </div>
  )
}

export default Carrito