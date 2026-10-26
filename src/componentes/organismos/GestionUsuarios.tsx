import { useState } from "react"
import type { FormEvent } from "react"
import CampoFormulario from "../moleculas/CampoFormulario"

interface Usuario {
  id: number
  nombre: string
  correo: string
  rol: "Admin" | "Cliente"
}

const usuariosIniciales: Usuario[] = [
  { id: 1, nombre: "Admin", correo: "admin@demo.cl", rol: "Admin" },
  { id: 2, nombre: "Cliente Ejemplo", correo: "cliente@correo.cl", rol: "Cliente" }
]

const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    try {
      const datos = localStorage.getItem("usuariosSanMarcos")
      if (datos) {
        const parseados = JSON.parse(datos)
        if (Array.isArray(parseados) && parseados.length > 0) return parseados
      }
    } catch {
      return usuariosIniciales
    }
    return usuariosIniciales
  })

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [idEditando, setIdEditando] = useState<number | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const guardarCambios = (nuevaLista: Usuario[]) => {
    setUsuarios(nuevaLista)
    localStorage.setItem("usuariosSanMarcos", JSON.stringify(nuevaLista))
  }

  const abrirCrear = () => {
    setIdEditando(null)
    setNombre("")
    setCorreo("")
    setMostrarFormulario(true)
  }

  const abrirEditar = (usuario: Usuario) => {
    setIdEditando(usuario.id)
    setNombre(usuario.nombre)
    setCorreo(usuario.correo)
    setMostrarFormulario(true)
  }

  const cancelar = () => {
    setMostrarFormulario(false)
    setIdEditando(null)
    setNombre("")
    setCorreo("")
  }

  const guardarUsuario = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim().toLowerCase()

    if (!nombreLimpio || !correoLimpio) {
      alert("Debes completar todos los campos obligatorios.")
      return
    }

    if (!formatoCorreo.test(correoLimpio)) {
      alert("Ingrese un correo electronico valido.")
      return
    }

    if (idEditando !== null) {
      const actualizados = usuarios.map((u) =>
        u.id === idEditando
          ? { ...u, nombre: nombreLimpio, correo: correoLimpio }
          : u
      )
      guardarCambios(actualizados)
      alert("Usuario actualizado con exito.")
    } else {
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1
      const nuevoUsuario: Usuario = {
        id: nuevoId,
        nombre: nombreLimpio,
        correo: correoLimpio,
        rol: "Cliente"
      }
      guardarCambios([...usuarios, nuevoUsuario])
      alert("Usuario creado con exito.")
    }

    cancelar()
  }

  const eliminarUsuario = (usuario: Usuario) => {
    if (usuario.rol === "Admin") {
      alert("El usuario Administrador no se puede eliminar porque siempre debe haber un admin.")
      return
    }

    if (window.confirm(`Estas seguro de eliminar al usuario ${usuario.nombre}?`)) {
      const filtrados = usuarios.filter((u) => u.id !== usuario.id)
      guardarCambios(filtrados)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn text-white fw-bold px-4"
          style={{ backgroundColor: "#2D3161" }}
          onClick={abrirCrear}
        >
          + Nuevo Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
          <h4 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
            {idEditando !== null ? "Editar Usuario" : "Agregar Nuevo Usuario"}
          </h4>
          <form onSubmit={guardarUsuario}>
            <div className="row g-3">
              <div className="col-12 col-md-5">
                <CampoFormulario
                  etiqueta="Nombre Completo"
                  tipo="text"
                  nombre="nombre"
                  valor={nombre}
                  placeholder="Ej: Juan Perez"
                  alCambiar={setNombre}
                />
              </div>
              <div className="col-12 col-md-4">
                <CampoFormulario
                  etiqueta="Correo Electronico"
                  tipo="email"
                  nombre="correo"
                  valor={correo}
                  placeholder="correo@ejemplo.com"
                  alCambiar={setCorreo}
                />
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Rol</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={idEditando !== null ? (usuarios.find((u) => u.id === idEditando)?.rol || "Cliente") : "Cliente"}
                    readOnly
                  />
                </div>
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
                <th>Correo</th>
                <th>Rol</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td className="fw-semibold">{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    {u.rol === "Admin" ? (
                      <span className="badge text-white" style={{ backgroundColor: "#2D3161" }}>
                        Admin
                      </span>
                    ) : (
                      <span className="badge bg-secondary">Cliente</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => abrirEditar(u)}
                    >
                      Editar
                    </button>
                    {u.rol === "Admin" ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled
                        title="El administrador no se puede eliminar"
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(u)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GestionUsuarios