import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import CampoFormulario from "../moleculas/CampoFormulario"

interface Cita {
  id: number
  nombreDueno: string
  telefono: string
  nombreMascota: string
  tipoMascota: string
  servicio: string
  fecha: string
  hora: string
  notas?: string
}

function FormularioAgendar() {
  const [nombreDueno, setNombreDueno] = useState("")
  const [telefono, setTelefono] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [tipoMascota, setTipoMascota] = useState("Perro")
  const [servicio, setServicio] = useState("Consulta General")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [notas, setNotas] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !nombreDueno.trim() ||
      !telefono.trim() ||
      !nombreMascota.trim() ||
      !fecha.trim() ||
      !hora.trim()
    ) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    const guardadas = localStorage.getItem("citasSanMarcos")
    const citasGuardadas: Cita[] = guardadas ? JSON.parse(guardadas) : []

    const nuevoId = citasGuardadas.length > 0 ? Math.max(...citasGuardadas.map((c) => c.id)) + 1 : 1

    const nuevaCita: Cita = {
      id: nuevoId,
      nombreDueno: nombreDueno.trim(),
      telefono: telefono.trim(),
      nombreMascota: nombreMascota.trim(),
      tipoMascota,
      servicio,
      fecha,
      hora,
      notas: notas.trim()
    }

    citasGuardadas.push(nuevaCita)
    localStorage.setItem("citasSanMarcos", JSON.stringify(citasGuardadas))

    alert(`Cita agendada con exito para ${nombreMascota} el dia ${fecha} a las ${hora}. Te esperamos en Veterinaria San Marcos.`)
    navigate("/")
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
          <div className="card-body">
            <h2 className="fw-bold text-center mb-2" style={{ color: "#2D3161" }}>
              Agendar Cita Medica
            </h2>
            <p className="text-muted text-center mb-4">
              Selecciona fecha y hora para la atencion de tu mascota
            </p>

            {error && (
              <div className="alert alert-danger py-2 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Nombre del Dueno o Responsable"
                    tipo="text"
                    nombre="nombreDueno"
                    valor={nombreDueno}
                    placeholder="Ej: Carolina Munoz"
                    obligatorio={true}
                    alCambiar={setNombreDueno}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Telefono de Contacto"
                    tipo="tel"
                    nombre="telefono"
                    valor={telefono}
                    placeholder="Ej: +56 9 1234 5678"
                    obligatorio={true}
                    alCambiar={setTelefono}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Nombre de la Mascota"
                    tipo="text"
                    nombre="nombreMascota"
                    valor={nombreMascota}
                    placeholder="Ej: Rocky"
                    obligatorio={true}
                    alCambiar={setNombreMascota}
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Tipo de Mascota <span className="text-danger">(*)</span>
                  </label>
                  <select
                    className="form-select"
                    value={tipoMascota}
                    onChange={(e) => setTipoMascota(e.target.value)}
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Exotico">Animal Exotico</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Servicio Requerido <span className="text-danger">(*)</span>
                </label>
                <select
                  className="form-select"
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                >
                  <option value="Consulta General">Consulta General</option>
                  <option value="Vacunacion Anual">Vacunacion Anual</option>
                  <option value="Peluqueria Canina/Felina">Peluqueria Canina/Felina</option>
                  <option value="Cirugia Menor">Cirugia Menor</option>
                  <option value="Desparasitacion Interna/Externa">Desparasitacion Interna/Externa</option>
                  <option value="Corte de Unas y Limpieza">Corte de Unas y Limpieza</option>
                </select>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Fecha de la Cita"
                    tipo="date"
                    nombre="fecha"
                    valor={fecha}
                    obligatorio={true}
                    alCambiar={setFecha}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Hora Preferida"
                    tipo="time"
                    nombre="hora"
                    valor={hora}
                    obligatorio={true}
                    alCambiar={setHora}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Motivo o Notas adicionales (Opcional)
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Detalla sintomas o indicaciones especiales..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn text-white fw-bold w-100 py-3"
                style={{ backgroundColor: "#2ec4b6" }}
              >
                Confirmar y Agendar Cita
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioAgendar