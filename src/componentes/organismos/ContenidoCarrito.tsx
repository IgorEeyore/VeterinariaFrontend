import { useState } from "react"
import { Link } from "react-router-dom"
import FilaCarrito from "../moleculas/FilaCarrito"
import ResumenCompra from "../moleculas/ResumenCompra"

interface ItemCarrito {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen: string
}

function ContenidoCarrito() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    try {
      const guardado = localStorage.getItem("carritoSanMarcos")
      if (guardado) {
        return JSON.parse(guardado)
      }
    } catch {
      return []
    }
    return []
  })

  const eliminarItem = (indice: number) => {
    const nuevoCarrito = [...carrito]
    nuevoCarrito.splice(indice, 1)
    setCarrito(nuevoCarrito)
    localStorage.setItem("carritoSanMarcos", JSON.stringify(nuevoCarrito))
  }

  const vaciarCarrito = () => {
    if (window.confirm("Seguro que deseas vaciar el carrito?")) {
      setCarrito([])
      localStorage.removeItem("carritoSanMarcos")
    }
  }

  const procesarPago = () => {
    alert("Compra realizada con exito. Nos comunicaremos contigo para coordinar tu atencion.")
    setCarrito([])
    localStorage.removeItem("carritoSanMarcos")
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0)

  if (carrito.length === 0) {
    return (
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
    )
  }

  return (
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
                  <FilaCarrito
                    key={`${item.id}-${index}`}
                    item={item}
                    indice={index}
                    onEliminar={eliminarItem}
                  />
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
        <ResumenCompra
          cantidad={carrito.length}
          total={total}
          onPagar={procesarPago}
        />
      </div>
    </div>
  )
}

export default ContenidoCarrito