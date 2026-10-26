
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

type DatosContacto = {
  nombre: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

const datosIniciales: DatosContacto = {
  nombre: "",
  correo: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

const asuntos = [
  "Consulta general",
  "Servicios veterinarios",
  "Vacunación",
  "Peluquería",
  "Precios y disponibilidad",
  "Otro",
];

function FormularioContacto() {
  const [datos, setDatos] =
    useState<DatosContacto>(datosIniciales);

  const [error, setError] = useState("");

  function actualizar(
    campo: keyof DatosContacto,
    valor: string
  ) {
    setDatos((actual) => ({
      ...actual,
      [campo]: valor,
    }));

    setError("");
  }

  function cambiarSelect(
    evento: ChangeEvent<HTMLSelectElement>
  ) {
    actualizar("asunto", evento.target.value);
  }

  function prepararCorreo(
    evento: FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();
    setError("");

    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim().toLowerCase();
    const telefono = datos.telefono.trim();
    const mensaje = datos.mensaje.trim();

    // CAMPOS OBLIGATORIOS
    if (!nombre || !correo || !datos.asunto || !mensaje) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    // VALIDACIÓN DEL CORREO
    const formatoCorreo =
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (
      !formatoCorreo.test(correo) ||
      /\.(example|test)$/i.test(correo)
    ) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    // VALIDACIÓN DEL CELULAR OPCIONAL
    if (telefono) {
      const numero = telefono.replace(/[\s()-]/g, "");

      if (!/^(?:\+?56)?9\d{8}$/.test(numero)) {
        setError(
          "El celular debe tener un formato válido, por ejemplo +56 9 1234 5678."
        );
        return;
      }
    }

    // VALIDACIÓN DEL MENSAJE
    if (mensaje.length < 10) {
      setError(
        "Tu mensaje debe contener al menos 10 caracteres."
      );
      return;
    }

    // PREPARAR EL CONTENIDO DEL CORREO
    const cuerpo = [
      `Nombre: ${nombre}`,
      `Correo de respuesta: ${correo}`,
      `Teléfono: ${telefono || "No informado"}`,
      `Motivo: ${datos.asunto}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");

    const destino = "veterinariasm@sanmarcos.cl";

    const enlace =
      `mailto:${destino}` +
      `?subject=${encodeURIComponent(datos.asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    // Abrir la aplicación de correo del usuario
    window.location.href = enlace;
  }

  return (
    <section
      className="row justify-content-center"
      aria-labelledby="titulo-formulario-contacto"
    >
      <div className="col-12 col-lg-9">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h2
              id="titulo-formulario-contacto"
              className="h3 fw-bold text-center mb-2"
              style={{ color: "#2D3161" }}
            >
              Envíanos tu consulta
            </h2>

            <p className="text-muted text-center mb-4">
              Completa tus datos para preparar un correo
              dirigido a nuestro equipo.
            </p>

            {/* MENSAJE DE ERROR */}
            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={prepararCorreo}>
              {/* NOMBRE COMPLETO */}
              <CampoFormulario
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={datos.nombre}
                placeholder="Ej: Carolina Muñoz"
                obligatorio
                alCambiar={(valor) =>
                  actualizar("nombre", valor.slice(0, 100))
                }
              />

              <div className="row">
                {/* CORREO */}
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Correo electrónico"
                    tipo="email"
                    nombre="correo"
                    valor={datos.correo}
                    placeholder="correo@ejemplo.cl"
                    obligatorio
                    alCambiar={(valor) =>
                      actualizar("correo", valor.slice(0, 254))
                    }
                  />
                </div>

                {/* CELULAR */}
                <div className="col-12 col-md-6">
                  <CampoFormulario
                    etiqueta="Celular (opcional)"
                    tipo="tel"
                    nombre="telefono"
                    valor={datos.telefono}
                    placeholder="+56 9 1234 5678"
                    alCambiar={(valor) =>
                      actualizar("telefono", valor.slice(0, 25))
                    }
                  />
                </div>
              </div>

              {/* ASUNTO */}
              <div className="mb-3">
                <label
                  htmlFor="contacto-asunto"
                  className="form-label fw-semibold"
                >
                  Asunto
                  <span className="text-danger"> (*)</span>
                </label>

                <select
                  id="contacto-asunto"
                  name="asunto"
                  className="form-select"
                  value={datos.asunto}
                  onChange={cambiarSelect}
                  required
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  {asuntos.map((asunto) => (
                    <option
                      key={asunto}
                      value={asunto}
                    >
                      {asunto}
                    </option>
                  ))}
                </select>
              </div>

              {/* MENSAJE */}
              <div className="mb-3">
                <label
                  htmlFor="contacto-mensaje"
                  className="form-label fw-semibold"
                >
                  Mensaje
                  <span className="text-danger"> (*)</span>
                </label>

                <textarea
                  id="contacto-mensaje"
                  name="mensaje"
                  className="form-control"
                  rows={5}
                  minLength={10}
                  maxLength={2000}
                  required
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  value={datos.mensaje}
                  onChange={(evento) =>
                    actualizar("mensaje", evento.target.value)
                  }
                />

                <div className="form-text">
                  Entre 10 y 2000 caracteres.
                </div>
              </div>

              {/* INFORMACIÓN ADICIONAL */}
              <p className="text-muted small mb-3">
                (*) Campos obligatorios. Para urgencias,
                comunícate directamente por teléfono.
              </p>

              {/* BOTÓN DE ENVÍO */}
              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-2"
                style={{ backgroundColor: "#2D3161" }}
              >
                Preparar correo de contacto
              </button>

              <p className="text-muted small text-center mt-3 mb-0">
                Se abrirá tu aplicación de correo con el
                mensaje listo. Debes confirmar el envío allí.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormularioContacto;
