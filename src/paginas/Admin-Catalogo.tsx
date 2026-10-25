
import { useState } from "react";
import type { FormEvent } from "react";

interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
}

interface ServicioEliminado {
  idHistorial: string;
  servicio: Servicio;
  fechaEliminacion: string;
}

const CLAVE = "catalogoSanMarcos";
const CLAVE_HISTORIAL = "historialServiciosSanMarcos";

const serviciosIniciales: Servicio[] = [
  { id: 1, nombre: "Consulta General", categoria: "Servicio", precio: 15000 },
  { id: 2, nombre: "Vacunación anual", categoria: "Servicio", precio: 25000 },
  { id: 3, nombre: "Peluquería Canina/Felina", categoria: "Servicio", precio: 18000 }
];

function cargarServicios(): Servicio[] {
  try {
    const datos = localStorage.getItem(CLAVE);
    if (datos !== null) {
      const resultado = JSON.parse(datos);
      if (Array.isArray(resultado)) return resultado;
    }
  } catch {
    console.error("Error al cargar servicios");
  }
  return serviciosIniciales;
}

function cargarHistorial(): ServicioEliminado[] {
  try {
    const datos = localStorage.getItem(CLAVE_HISTORIAL);
    const resultado = JSON.parse(datos || "[]");
    return Array.isArray(resultado) ? resultado : [];
  } catch {
    return [];
  }
}

function AdminCatalogo() {
  const [servicios, setServicios] = useState<Servicio[]>(cargarServicios);
  const [historial, setHistorial] = useState<ServicioEliminado[]>(cargarHistorial);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function actualizarServicios(lista: Servicio[]) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
    setServicios(lista);
  }

  function limpiarFormulario() {
    setNombre("");
    setPrecio("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function abrirCrear() {
    limpiarFormulario();
    setMensaje("");
    setMostrarFormulario(true);
  }

  function editarServicio(servicio: Servicio) {
    setIdEditando(servicio.id);
    setNombre(servicio.nombre);
    setPrecio(String(servicio.precio));
    setMostrarFormulario(true);
    setMensaje("");
  }

  function guardarServicio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();
    const precioNumero = Number(precio);

    if (!nombreLimpio || !precio.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    if (!Number.isSafeInteger(precioNumero) || precioNumero <= 0) {
      setMensaje("El precio debe ser un número entero mayor a cero.");
      return;
    }

    if (idEditando !== null) {
      const actualizados = servicios.map((servicio) =>
        servicio.id === idEditando
          ? { ...servicio, nombre: nombreLimpio, precio: precioNumero }
          : servicio
      );

      actualizarServicios(actualizados);
      setMensaje("Servicio actualizado correctamente.");
    } else {
      const nuevoId = Math.max(0, ...servicios.map((s) => s.id)) + 1;

      const nuevoServicio: Servicio = {
        id: nuevoId,
        nombre: nombreLimpio,
        categoria: "Servicio",
        precio: precioNumero
      };

      actualizarServicios([...servicios, nuevoServicio]);
      setMensaje("Servicio creado correctamente.");
    }

    limpiarFormulario();
  }

  function eliminarServicio(servicio: Servicio) {
    const confirmar = window.confirm(
      `¿Eliminar "${servicio.nombre}"? Podrás restaurarlo desde el historial.`
    );

    if (!confirmar) return;

    const registro: ServicioEliminado = {
      idHistorial: crypto.randomUUID(),
      servicio: { ...servicio },
      fechaEliminacion: new Date().toISOString()
    };

    try {
      localStorage.setItem(
        CLAVE_HISTORIAL,
        JSON.stringify([registro, ...historial])
      );
      localStorage.setItem(
        CLAVE,
        JSON.stringify(servicios.filter((s) => s.id !== servicio.id))
      );
    } catch {
      setMensaje("No se pudo guardar el respaldo. No se eliminó el servicio.");
      return;
    }

    setHistorial([registro, ...historial]);
    setServicios(servicios.filter((s) => s.id !== servicio.id));

    if (idEditando === servicio.id) limpiarFormulario();

    setMensaje("Servicio eliminado. Puedes restaurarlo desde el historial.");
  }

  function restaurarServicio(registro: ServicioEliminado) {
    if (!window.confirm(`¿Restaurar "${registro.servicio.nombre}"?`)) return;

    const idOcupado = servicios.some((s) => s.id === registro.servicio.id);

    const restaurado: Servicio = {
      ...registro.servicio,
      id: idOcupado
        ? Math.max(0, ...servicios.map((s) => s.id)) + 1
        : registro.servicio.id
    };

    const nuevosServicios = [...servicios, restaurado];
    const nuevoHistorial = historial.filter(
      (item) => item.idHistorial !== registro.idHistorial
    );

    try {
      localStorage.setItem(CLAVE, JSON.stringify(nuevosServicios));
      localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(nuevoHistorial));
    } catch {
      setMensaje("No se pudo completar la restauración.");
      return;
    }

    setServicios(nuevosServicios);
    setHistorial(nuevoHistorial);
    setMensaje("Servicio restaurado correctamente.");
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1>Administrar catálogo</h1>
          <p className="text-muted">Gestiona los servicios de Veterinaria San Marcos.</p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
          >
            Historial ({historial.length})
          </button>

          <button type="button" className="btn btn-primary" onClick={abrirCrear}>
            + Agregar servicio
          </button>
        </div>
      </div>

      {mensaje && <div className="alert alert-info" role="status">{mensaje}</div>}

      {mostrarFormulario && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h5">
              {idEditando !== null ? "Editar servicio" : "Agregar servicio"}
            </h2>

            <form onSubmit={guardarServicio}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="nombreServicio" className="form-label">
                    Nombre del servicio
                  </label>
                  <input
                    id="nombreServicio"
                    className="form-control"
                    value={nombre}
                    maxLength={100}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="categoriaServicio" className="form-label">
                    Categoría
                  </label>
                  <input
                    id="categoriaServicio"
                    className="form-control"
                    value="Servicio"
                    readOnly
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="precioServicio" className="form-label">
                    Precio (CLP)
                  </label>
                  <input
                    id="precioServicio"
                    type="number"
                    min="1"
                    step="1"
                    className="form-control"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {idEditando !== null ? "Guardar cambios" : "Crear servicio"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={limpiarFormulario}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5">Servicios registrados ({servicios.length})</h2>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.categoria}</td>
                    <td>${servicio.precio.toLocaleString("es-CL")}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => editarServicio(servicio)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarServicio(servicio)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {servicios.length === 0 && <p>No hay servicios registrados.</p>}
          </div>
        </div>
      </div>

      {mostrarHistorial && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5">Historial de servicios eliminados</h2>
            <p className="text-muted">
              Los servicios eliminados pueden recuperarse con su precio original.
            </p>

            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio original</th>
                    <th>Fecha de eliminación</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((registro) => (
                    <tr key={registro.idHistorial}>
                      <td>{registro.servicio.nombre}</td>
                      <td>{registro.servicio.categoria}</td>
                      <td>${registro.servicio.precio.toLocaleString("es-CL")}</td>
                      <td>
                        {new Date(registro.fechaEliminacion).toLocaleString("es-CL")}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => restaurarServicio(registro)}
                        >
                          Restaurar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {historial.length === 0 && <p>No hay servicios eliminados.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCatalogo;
