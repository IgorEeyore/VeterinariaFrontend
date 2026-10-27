import Boton from "../atomos/Boton"

interface CardServicioProps {
  id: number
  nombre: string
  categoria: string
  precio: number
  descripcionCorta: string
  imagen?: string
  onAgregarCarrito?: (id: number) => void
}

function CardServicio({
  id,
  nombre,
  categoria,
  precio,
  descripcionCorta,
  imagen,
  onAgregarCarrito
}: CardServicioProps) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      {imagen ? (
        <img
          src={imagen}
          className="card-img-top"
          alt={nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light text-muted fw-semibold"
          style={{ height: "200px" }}
        >
          Sin imagen
        </div>
      )}
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge text-white" style={{ backgroundColor: "#2ec4b6" }}>
            {categoria}
          </span>
          <span className="fw-bold text-success fs-5">
            ${precio.toLocaleString("es-CL")}
          </span>
        </div>
        <h5 className="card-title fw-bold text-dark">{nombre}</h5>
        <p className="card-text text-muted small mb-3">{descripcionCorta}</p>
        <div className="mt-auto d-flex flex-column gap-2">
          <Boton id={id} />
          {onAgregarCarrito && (
            <button
              type="button"
              className="btn btn-outline-success fw-bold w-100"
              onClick={() => onAgregarCarrito(id)}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardServicio