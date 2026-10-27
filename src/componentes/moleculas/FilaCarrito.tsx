interface ItemCarrito {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen?: string
}

interface FilaCarritoProps {
  item: ItemCarrito
  indice: number
  onEliminar: (indice: number) => void
}

function FilaCarrito({ item, indice, onEliminar }: FilaCarritoProps) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-3">
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          ) : (
            <div
              className="bg-light text-muted d-flex align-items-center justify-content-center text-center fw-semibold"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "8px",
                fontSize: "11px"
              }}
            >
              Sin foto
            </div>
          )}
          <span className="fw-semibold">{item.nombre}</span>
        </div>
      </td>
      <td>
        <span
          className="badge text-white"
          style={{ backgroundColor: "#2ec4b6" }}
        >
          {item.categoria}
        </span>
      </td>
      <td className="fw-bold text-success">
        ${item.precio.toLocaleString("es-CL")}
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onEliminar(indice)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default FilaCarrito