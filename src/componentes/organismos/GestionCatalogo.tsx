import { useState } from "react"
import type { FormEvent } from "react"
import CampoFormulario from "../moleculas/CampoFormulario"

interface Servicio {
  id: number
  nombre: string
  categoria: string
  precio: number
  descripcionCorta?: string
  descripcionLarga?: string
  imagen?: string
}

const serviciosIniciales: Servicio[] = [
  {
    id: 1,
    nombre: "Consulta General",
    categoria: "Servicio",
    precio: 15000,
    imagen: "/img/consulta1.jpg",
    descripcionCorta: "Revision fisica completa para tu mascota.",
    descripcionLarga: "La consulta general incluye una revision exhaustiva de los signos vitales, peso, temperatura, revision dental, ocular y de oidos."
  },
  {
    id: 2,
    nombre: "Vacunacion Anual",
    categoria: "Servicio",
    precio: 25000,
    imagen: "/img/vacuna2.jpg",
    descripcionCorta: "Esquema de vacunacion preventiva.",
    descripcionLarga: "Protege a tu mascota contra las enfermedades mas comunes y peligrosas. Incluye la vacuna Octuple o Triple Felina."
  },
  {
    id: 3,
    nombre: "Peluqueria Canina/Felina",
    categoria: "Servicio",
    precio: 18000,
    imagen: "/img/peinado.jpg",
    descripcionCorta: "Bano, corte de pelo y unas.",
    descripcionLarga: "Servicio estetico completo. Incluye bano con shampoo hipoalergenico, limpieza de glandulas anales y corte."
  },
  {
    id: 4,
    nombre: "Desparasitacion Interna/Externa",
    categoria: "Medicamento",
    precio: 12000,
    imagen: "/img/vacuna.jpg",
    descripcionCorta: "Tratamiento contra parasitos y pulgas.",
    descripcionLarga: "Control integral de parasitos gastrointestinales y ectoparasitos como pulgas y garrapatas con farmacos certificados."
  },
  {
    id: 5,
    nombre: "Cirugia Menor",
    categoria: "Servicio",
    precio: 45000,
    imagen: "/img/consulta.jpg",
    descripcionCorta: "Intervenciones quirurgicas programadas.",
    descripcionLarga: "Procedimientos como esterilizacion, castracion o suturas menores con anestesia monitoreada y cuidados postoperatorios."
  },
  {
    id: 6,
    nombre: "Corte de Unas y Limpieza",
    categoria: "Servicio",
    precio: 8000,
    imagen: "/img/unas.jpg",
    descripcionCorta: "Cuidado podologico y de almohadillas.",
    descripcionLarga: "Corte seguro de unas para evitar sobrecrecimiento y sangrado, junto con hidratacion de almohadillas plantares."
  }
]

function GestionCatalogo() {
  const [servicios, setServicios] = useState<Servicio[]>(() => {
    const datos = localStorage.getItem("catalogoSanMarcos")
    return datos ? JSON.parse(datos) : serviciosIniciales
  })

  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("Servicio")
  const [precio, setPrecio] = useState("")
  const [descripcionCorta, setDescripcionCorta] = useState("")
  const [descripcionLarga, setDescripcionLarga] = useState("")
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
    setDescripcionCorta("")
    setDescripcionLarga("")
    setMostrarFormulario(true)
  }

  const abrirEditar = (item: Servicio) => {
    setIdEditando(item.id)
    setNombre(item.nombre)
    setCategoria(item.categoria)
    setPrecio(String(item.precio))
    setDescripcionCorta(item.descripcionCorta || "")
    setDescripcionLarga(item.descripcionLarga || "")
    setMostrarFormulario(true)
  }

  const cancelar = () => {
    setMostrarFormulario(false)
    setIdEditando(null)
    setNombre("")
    setPrecio("")
    setDescripcionCorta("")
    setDescripcionLarga("")
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
          ? {
              ...s,
              nombre: nombreLimpio,
              categoria,
              precio: precioNumero,
              descripcionCorta: descripcionCorta.trim(),
              descripcionLarga: descripcionLarga.trim()
            }
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
        precio: precioNumero,
        descripcionCorta: descripcionCorta.trim(),
        descripcionLarga: descripcionLarga.trim()
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

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  etiqueta="Descripcion Corta"
                  tipo="text"
                  nombre="descripcionCorta"
                  valor={descripcionCorta}
                  placeholder="Ej: Revision completa para tu mascota"
                  alCambiar={setDescripcionCorta}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Descripcion Detallada
                </label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Detalla lo que incluye el servicio o producto..."
                  value={descripcionLarga}
                  onChange={(e) => setDescripcionLarga(e.target.value)}
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