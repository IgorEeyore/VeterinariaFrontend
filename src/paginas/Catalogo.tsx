import { useState } from "react"
import CardServicio from "../componentes/moleculas/CardServicio"
import { listaServicios } from "./DetalleServicio"

function Catalogo() {
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("Todos")

  const agregarAlCarrito = (id: number) => {
    const item = listaServicios.find((s) => s.id === id)
    if (!item) return
    const carritoActual = JSON.parse(localStorage.getItem("carritoSanMarcos") || "[]")
    carritoActual.push(item)
    localStorage.setItem("carritoSanMarcos", JSON.stringify(carritoActual))
    alert(`${item.nombre} se agrego al carrito.`)
  }

  const serviciosFiltrados = listaServicios.filter((servicio) => {
    const coincideTexto =
      servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      servicio.descripcionCorta.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria =
      categoria === "Todos" || servicio.categoria === categoria
    return coincideTexto && coincideCategoria
  })

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

      <div className="card shadow-sm border-0 p-4 mb-4 rounded-4 bg-white">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label className="form-label fw-semibold">
              Buscar por nombre o descripcion
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Consulta, Vacuna, Peluqueria..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">
              Filtrar por categoria
            </label>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Todos">Todas las categorias</option>
              <option value="Servicio">Servicio</option>
              <option value="Medicamento">Medicamento</option>
            </select>
          </div>
        </div>
      </div>

      {serviciosFiltrados.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5 text-muted">
            No se encontraron servicios que coincidan con la busqueda.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {serviciosFiltrados.map((servicio) => (
            <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
              <CardServicio
                id={servicio.id}
                nombre={servicio.nombre}
                categoria={servicio.categoria}
                precio={servicio.precio}
                descripcionCorta={servicio.descripcionCorta}
                imagen={servicio.imagen}
                onAgregarCarrito={agregarAlCarrito}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo