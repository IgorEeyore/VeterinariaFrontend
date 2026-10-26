import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import CampoFormulario from "../moleculas/CampoFormulario"

interface UsuarioRegistrado {
  id: number
  nombre: string
  correo: string
  rol: "Admin" | "Cliente"
}

const usuariosIniciales: UsuarioRegistrado[] = [
  { id: 1, nombre: "Admin", correo: "admin@demo.cl", rol: "Admin" },
  { id: 2, nombre: "Cliente Ejemplo", correo: "cliente@correo.cl", rol: "Cliente" }
]

const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FormularioLogin() {
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (correo.trim() === "" || contrasena.trim() === "") {
      setError("Por favor complete todos los campos")
      return
    }

    if (!formatoCorreo.test(correo.trim())) {
      setError("Por favor ingrese un correo electronico valido")
      return
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
      setError("La contrasena debe tener entre 4 y 10 caracteres")
      return
    }

    let usuarios: UsuarioRegistrado[] = usuariosIniciales
    try {
      const guardados = localStorage.getItem("usuariosSanMarcos")
      if (guardados) {
        const parseados = JSON.parse(guardados)
        if (Array.isArray(parseados) && parseados.length > 0) {
          usuarios = parseados
        }
      }
    } catch {
      usuarios = usuariosIniciales
    }

    const correoLimpio = correo.trim().toLowerCase()
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correoLimpio
    )

    if (correoLimpio === "admin@demo.cl" && contrasena === "1234") {
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({ nombre: "Admin", correo: "admin@demo.cl", rol: "Admin" })
      )
      navigate("/admin")
      return
    }

    if (correoLimpio === "user@demo.cl" && contrasena === "5678") {
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({ nombre: "Usuario", correo: "user@demo.cl", rol: "Cliente" })
      )
      navigate("/")
      return
    }

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado))
      if (usuarioEncontrado.rol === "Admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
      return
    }

    setError("Correo o contrasena incorrectos")
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <div className="card-body">
            <h2 className="fw-bold text-center mb-2" style={{ color: "#2D3161" }}>
              Iniciar sesion
            </h2>
            <p className="text-muted text-center mb-4">
              Ingresa tus credenciales para acceder al sistema
            </p>

            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <CampoFormulario
                etiqueta="Correo electronico"
                tipo="email"
                nombre="correo"
                valor={correo}
                placeholder="ejemplo@demo.cl"
                obligatorio={true}
                alCambiar={setCorreo}
              />

              <CampoFormulario
                etiqueta="Contrasena"
                tipo="password"
                nombre="contrasena"
                valor={contrasena}
                placeholder="Ingresa tu contrasena (entre 4 y 10 caracteres)"
                obligatorio={true}
                alCambiar={(val) => setContrasena(val.slice(0, 10))}
              />

              <button
                type="submit"
                className="btn text-white fw-bold w-100 py-2 mt-3"
                style={{ backgroundColor: "#2D3161" }}
              >
                Ingresar
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">No tienes una cuenta? </span>
              <Link
                to="/registro"
                className="fw-semibold text-decoration-none"
                style={{ color: "#2ec4b6" }}
              >
                Registrate aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioLogin