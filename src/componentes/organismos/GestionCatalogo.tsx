import { useState } from "react"
import type { FormEvent } from "react"
import CampoFormulario from "../moleculas/CampoFormulario"

interface Servicio {
  id: number
  nombre: string
  categoria: string
  precio: number
}

const serviciosIniciales: Servicio[] = [
  { id: 1, nombre: "Consulta General", categoria: "Servicio", precio: 15000 },
  { id: 2, nombre: "Vacunacion Anual", categoria: "Servicio", precio: 25000 },
  { id: 3, nombre: "Peluqueria Canina/Felina", categoria: "Servicio", precio: 18000 },
  { id: 4, nombre: "Desparasitacion Interna/Externa", categoria: "Medicamento", precio: 12000 },
  { id: 5, nombre: "Cirugia Menor", categoria: "Servicio", precio: 45000 },
  { id: 6, nombre: "Corte de Unas y Limpieza", categoria: "Servicio", precio: 8000 }
]

function GestionCatalogo() {
  const [servicios, setServicios] = useState<Servicio[]>(() => {
    try {
      const datos = localStorage.getItem("catalogoSanMarcos")
      if (datos) {
        const parseados = JSON.parse(datos)
        if (Array.isArray(parseados) && parseados.length > 0) return parseados
      }
    } catch {
      return serviciosIniciales
    }
    return serviciosIniciales
  })

  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("Servicio")
  const [precio, setPrecio] = useState("")
  const [idEditando, setIdEditando] = useState<number | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const guardarCambios = (nuevaLista: Servicio[]) => {
    setServicios(nuevaLista)
    localStorage.setItem("catalogoSanMarcos", JSON.stringify(nuevaLista))
  }

  const abrirCrear = () => {
    setIdEditando(null)
    setNombre("")
    setCategoria("Servicio")
    setPrecio("")
    setMostrarFormulario(true)
  }

  const abrirEditar = (item: Servicio) => {
    setIdEditando(item.id)
    setNombre(item.nombre)
    setCategoria(item.categoria)
    setPrecio(String(item.precio))
    setMostrarFormulario(true)
  }

  const cancelar = () => {
    setMostrarFormulario(false)
    setIdEditando(null)
    setNombre("")
    setPrecio("")
  }

  const guardarServicio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nombreLimpio = nombre.trim()
    const precioNumero = Number(precio)

    if (!nombreLimpio || !precio.trim()) {
      alert("Debes completar todos los campos obligatorios.")
      return
    }

    if (isNaN(precioNumero) || precioNumero <= 0) {
      alert("El precio debe ser un numero valido mayor a cero.")
      return
    }

    if (idEditando !== null) {
      const actualizados = servicios.map((s) =>
        s.id === idEditando
          ? { ...s, nombre: nombreLimpio, categoria, precio: precioNumero }
          : s
      )
      guardarCambios(actualizados)
      alert("Servicio actualizado con exito.")
    } else {
      const nuevoId = servicios.length > 0 ? Math.max(...servicios.map((s) => s.id)) + 1 : 1
      const nuevoServicio: Servicio = {
        id: nuevoId,
        nombre: nombreLimpio,
        categoria,
        precio: precioNumero
      }
      guardarCambios([...servicios, nuevoServicio])
      alert("Servicio creado con exito.")
    }

    cancelar()
  }

  const eliminarServicio = (id: number) => {
    if (window.confirm("Estas seguro de eliminar este item?")) {
      const filtrados = servicios.filter((s) => s.id !== id)
      guardarCambios(filtrados)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn text-white fw-bold px-4"
          style={{ backgroundColor: "#2ec4b6" }}
          onClick={abrirCrear}
        >
          + Nuevo Item
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
          <h4 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
            {idEditando !== null ? "Editar Servicio" : "Agregar Nuevo Servicio"}
          </h4>
          <form onSubmit={guardarServicio}>
            <div className="row g-3">
              <div className="col-12 col-md-5">
                <CampoFormulario
                  etiqueta="Nombre del Servicio o Producto"
                  tipo="text"
                  nombre="nombre"
                  valor={nombre}
                  placeholder="Ej: Vacunacion felina"
                  obligatorio={true}
                  alCambiar={setNombre}
                />
              </div>
              <div className="col-12 col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Categoria <span className="text-danger">(*)</span>
                  </label>
                  <select
                    className="form-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="Servicio">Servicio</option>
                    <option value="Medicamento">Medicamento</option>
                    <option value="Producto">Producto</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <CampoFormulario
                  etiqueta="Precio ($ CLP)"
                  tipo="number"
                  nombre="precio"
                  valor={precio}
                  placeholder="Ej: 15000"
                  obligatorio={true}
                  alCambiar={setPrecio}
                />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end mt-4">
              <button type="button" className="btn btn-secondary" onClick={cancelar}>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn text-white fw-bold px-4"
                style={{ backgroundColor: "#2ec4b6" }}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    No hay servicios registrados en el catalogo.
                  </td>
                </tr>
              ) : (
                servicios.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td className="fw-semibold">{s.nombre}</td>
                    <td>
                      <span className="badge text-white" style={{ backgroundColor: "#2ec4b6" }}>
                        {s.categoria}
                      </span>
                    </td>
                    <td className="fw-bold text-success">${s.precio.toLocaleString("es-CL")}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => abrirEditar(s)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarServicio(s.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GestionCatalogo