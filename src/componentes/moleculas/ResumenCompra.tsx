import { Link } from "react-router-dom"

interface ResumenCompraProps {
  cantidad: number
  total: number
  onPagar: () => void
}

function ResumenCompra({ cantidad, total, onPagar }: ResumenCompraProps) {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h4 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
        Resumen de Compra
      </h4>
      <div className="d-flex justify-content-between mb-2">
        <span>Cantidad de items:</span>
        <span className="fw-semibold">{cantidad}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fs-4 fw-bold mb-4">
        <span>Total:</span>
        <span className="text-success">
          ${total.toLocaleString("es-CL")}
        </span>
      </div>
      <button
        type="button"
        className="btn text-white fw-bold w-100 py-2 mb-2"
        style={{ backgroundColor: "#2ec4b6" }}
        onClick={onPagar}
      >
        Pagar Ahora
      </button>
      <Link
        to="/catalogo"
        className="btn btn-outline-secondary w-100 py-2"
      >
        Seguir Comprando
      </Link>
    </div>
  )
}

export default ResumenCompra