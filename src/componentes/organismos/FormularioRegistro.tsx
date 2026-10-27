import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import CampoFormulario from "../moleculas/CampoFormulario"

interface Usuario {
  id: number
  nombre: string
  correo: string
  rol: "Admin" | "Cliente"
  contrasena?: string
}

const usuariosIniciales: Usuario[] = [
  { id: 1, nombre: "Admin", correo: "admin@demo.cl", rol: "Admin" },
  { id: 2, nombre: "Cliente Ejemplo", correo: "cliente@correo.cl", rol: "Cliente" }
]

const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const formatoRut = /^[0-9]{7,8}[0-9kK]$/

const validarRut = (rut: string): boolean => {
  const valor = rut.replace(/\./g, "").replace(/-/g, "")
  const cuerpo = valor.slice(0, -1)
  let dv = valor.slice(-1).toUpperCase()

  if (cuerpo.length < 7 || cuerpo.length > 8) return false

  let suma = 0
  let multiplo = 2
  let i = 1

  while (i <= cuerpo.length) {
    const index = multiplo * Number(valor.charAt(cuerpo.length - i))
    suma = suma + index
    multiplo = multiplo < 7 ? multiplo + 1 : 2
    i++
  }

  const residuo = 11 - (suma % 11)
  let dvEsperado = String(residuo)
  if (residuo === 11) dvEsperado = "0"
  if (residuo === 10) dvEsperado = "K"

  return dv === dvEsperado
}

function FormularioRegistro() {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [rut, setRut] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nombre.trim() || !correo.trim() || !rut.trim() || !contrasena.trim()) {
      setError("Todos los campos obligatorios deben ser completados")
      return
    }

    const rutLimpio = rut.trim()
    if (!formatoRut.test(rutLimpio)) {
      setError("El RUN debe ingresarse sin puntos ni guion")
      return
    }

    if (!validarRut(rutLimpio)) {
      setError("El RUN ingresado no es valido (Digito verificador incorrecto)")
      return
    }

    if (!formatoCorreo.test(correo.trim())) {
      setError("Por favor ingresa un correo electronico valido")
      return
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
      setError("La contrasena debe tener entre 4 y 10 caracteres")
      return
    }

    const guardados = localStorage.getItem("usuariosSanMarcos")
    const usuarios: Usuario[] = guardados ? JSON.parse(guardados) : usuariosIniciales

    const existe = usuarios.some(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
    )

    if (existe) {
      setError("Este correo ya se encuentra registrado")
      return
    }

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1

    const nuevoUsuario: Usuario = {
      id: nuevoId,
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      rol: "Cliente",
      contrasena: contrasena.trim()
    }

    const nuevaLista = [...usuarios, nuevoUsuario]
    localStorage.setItem("usuariosSanMarcos", JSON.stringify(nuevaLista))

    alert("Registro exitoso. Ahora puedes iniciar sesion con tu cuenta.")
    navigate("/login")
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 rounded-4 p-4">
          <div className="card-body">
            <h2 className="fw-bold text-center mb-2" style={{ color: "#2D3161" }}>
              Crear Cuenta
            </h2>
            <p className="text-muted text-center mb-4">
              Registrate para gestionar citas, servicios y compras
            </p>

            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <CampoFormulario
                etiqueta="Nombre Completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                placeholder="Ej: Juan Perez"
                obligatorio={true}
                alCambiar={setNombre}
              />

              <CampoFormulario
                etiqueta="RUN o RUT (sin puntos ni guion)"
                tipo="text"
                nombre="rut"
                valor={rut}
                placeholder="Ej: 123456789"
                obligatorio={true}
                alCambiar={(val) => setRut(val.replace(/[^0-9kK]/g, "").slice(0, 9))}
              />

              <CampoFormulario
                etiqueta="Correo electronico"
                tipo="email"
                nombre="correo"
                valor={correo}
                placeholder="correo@ejemplo.cl"
                obligatorio={true}
                alCambiar={setCorreo}
              />

              <CampoFormulario
                etiqueta="Contrasena (entre 4 y 10 caracteres)"
                tipo="password"
                nombre="contrasena"
                valor={contrasena}
                placeholder="Ingresa entre 4 y 10 caracteres"
                obligatorio={true}
                alCambiar={(val) => setContrasena(val.slice(0, 10))}
              />

              <button
                type="submit"
                className="btn text-white fw-bold w-100 py-2 mt-3"
                style={{ backgroundColor: "#2D3161" }}
              >
                Registrarme
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">Ya tienes una cuenta? </span>
              <Link
                to="/login"
                className="fw-semibold text-decoration-none"
                style={{ color: "#2ec4b6" }}
              >
                Inicia sesion aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioRegistro