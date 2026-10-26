import { useState } from "react"
import { Link } from "react-router-dom"

interface ItemCarrito {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen: string
}

function Carrito() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    return JSON.parse(localStorage.getItem("carritoSanMarcos") || "[]")
  })

  const eliminarItem = (indice: number) => {
    const nuevoCarrito = [...carrito]
    nuevoCarrito.splice(indice, 1)
    setCarrito(nuevoCarrito)
    localStorage.setItem("carritoSanMarcos", JSON.stringify(nuevoCarrito))
  }

  const vaciarCarrito = () => {
    if (window.confirm("¿Seguro que deseas vaciar el carrito?")) {
      setCarrito([])
      localStorage.removeItem("carritoSanMarcos")
    }
  }

  const procesarPago = () => {
    alert("¡Compra realizada con exito! Nos comunicaremos contigo para coordinar tu atencion.")
    setCarrito([])
    localStorage.removeItem("carritoSanMarcos")
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0)

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: "#2D3161" }}>
        🛒 Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div className="card shadow-sm border-0 p-5 text-center rounded-4">
          <p className="fs-4 text-muted mb-3">Tu carrito esta vacio</p>
          <p className="text-secondary mb-4">
            Aun no has agregado servicios o productos a tu compra.
          </p>
          <div>
            <Link
              to="/catalogo"
              className="btn text-white fw-bold px-4 py-2"
              style={{ backgroundColor: "#2ec4b6" }}
            >
              Explorar Catalogo
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Servicio</th>
                      <th>Categoria</th>
                      <th>Precio</th>
                      <th className="text-center">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, index) => (
                      <tr key={`${item.id}-${index}`}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
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
                            onClick={() => eliminarItem(index)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-3 text-end">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={vaciarCarrito}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h4 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
                Resumen de Compra
              </h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Cantidad de items:</span>
                <span className="fw-semibold">{carrito.length}</span>
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
                onClick={procesarPago}
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito