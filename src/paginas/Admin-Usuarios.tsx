
import { useState } from "react";
import type { FormEvent } from "react";

type Rol = "Admin" | "Cliente";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
}

interface UsuarioEliminado {
  idHistorial: string;
  usuario: Usuario;
  fechaEliminacion: string;
}

const CLAVE = "usuariosSanMarcos";
const CLAVE_HISTORIAL = "historialUsuariosSanMarcos";

const usuariosIniciales: Usuario[] = [
  { id: 1, nombre: "Admin", correo: "admin@demo.cl", rol: "Admin" },
  { id: 2, nombre: "Cliente Ejemplo", correo: "cliente@correo.cl", rol: "Cliente" }
];

const formatoCorreo =
  /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(com|net|org|info|biz|cl|co|es|mx|cc|io)$/i;

function cargarUsuarios(): Usuario[] {
  try {
    const datos = localStorage.getItem(CLAVE);

    if (datos !== null) {
      const resultado: unknown = JSON.parse(datos);

      if (Array.isArray(resultado)) {
        return resultado.filter(
          (usuario): usuario is Usuario =>
            typeof usuario === "object" &&
            usuario !== null &&
            typeof usuario.id === "number" &&
            typeof usuario.nombre === "string" &&
            typeof usuario.correo === "string" &&
            (usuario.rol === "Admin" || usuario.rol === "Cliente")
        );
      }
    }
  } catch {
    console.error("Error al cargar usuarios");
  }

  return usuariosIniciales;
}

function cargarHistorial(): UsuarioEliminado[] {
  try {
    const datos = localStorage.getItem(CLAVE_HISTORIAL);
    const resultado: unknown = JSON.parse(datos || "[]");

    if (!Array.isArray(resultado)) return [];

    return resultado.filter(
      (registro): registro is UsuarioEliminado =>
        typeof registro === "object" &&
        registro !== null &&
        typeof registro.idHistorial === "string" &&
        typeof registro.fechaEliminacion === "string" &&
        typeof registro.usuario === "object" &&
        registro.usuario !== null &&
        typeof registro.usuario.id === "number" &&
        typeof registro.usuario.nombre === "string" &&
        typeof registro.usuario.correo === "string" &&
        (registro.usuario.rol === "Admin" ||
          registro.usuario.rol === "Cliente")
    );
  } catch {
    return [];
  }
}

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(cargarUsuarios);
  const [historial, setHistorial] = useState<UsuarioEliminado[]>(cargarHistorial);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState<Rol>("Cliente");

  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function actualizarUsuarios(lista: Usuario[]) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
    setUsuarios(lista);
  }

  function limpiarFormulario() {
    setNombre("");
    setCorreo("");
    setRol("Cliente");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function abrirCrear() {
    limpiarFormulario();
    setMensaje("");
    setMostrarFormulario(true);
  }

  function editarUsuario(usuario: Usuario) {
    setIdEditando(usuario.id);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setRol(usuario.rol);
    setMostrarFormulario(true);
    setMensaje("");
  }

  function guardarUsuario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (!nombreLimpio) {
      setMensaje("Debes ingresar el nombre del usuario.");
      return;
    }

    if (!formatoCorreo.test(correoLimpio)) {
      setMensaje(
        "Correo inválido. Utiliza una extensión permitida como .com, .cl, .net, .org, .info, .biz, .co, .es, .mx, .cc o .io."
      );
      return;
    }

    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() === correoLimpio &&
        usuario.id !== idEditando
    );

    if (correoExiste) {
      setMensaje("El correo electrónico ya está registrado.");
      return;
    }

    if (idEditando !== null) {
      const original = usuarios.find((usuario) => usuario.id === idEditando);
      const cantidadAdmins = usuarios.filter((u) => u.rol === "Admin").length;

      if (
        original?.rol === "Admin" &&
        rol !== "Admin" &&
        cantidadAdmins <= 1
      ) {
        setMensaje("No puedes cambiar el rol del último administrador.");
        return;
      }

      const actualizados = usuarios.map((usuario) =>
        usuario.id === idEditando
          ? { ...usuario, nombre: nombreLimpio, correo: correoLimpio, rol }
          : usuario
      );

      actualizarUsuarios(actualizados);
      setMensaje("Usuario actualizado correctamente.");
    } else {
      const nuevoId = Math.max(0, ...usuarios.map((u) => u.id)) + 1;

      const nuevoUsuario: Usuario = {
        id: nuevoId,
        nombre: nombreLimpio,
        correo: correoLimpio,
        rol
      };

      actualizarUsuarios([...usuarios, nuevoUsuario]);
      setMensaje("Usuario creado correctamente.");
    }

    limpiarFormulario();
  }

  function eliminarUsuario(usuario: Usuario) {
    const cantidadAdmins = usuarios.filter((u) => u.rol === "Admin").length;

    if (usuario.rol === "Admin" && cantidadAdmins <= 1) {
      setMensaje("No puedes eliminar al último administrador.");
      return;
    }

    const confirmar = window.confirm(
      `¿Eliminar a "${usuario.nombre}"? Podrás recuperarlo desde el historial.`
    );

    if (!confirmar) return;

    const registro: UsuarioEliminado = {
      idHistorial: crypto.randomUUID(),
      usuario: { ...usuario },
      fechaEliminacion: new Date().toISOString()
    };

    const nuevoHistorial = [registro, ...historial];
    const nuevosUsuarios = usuarios.filter((u) => u.id !== usuario.id);

    try {
      localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(nuevoHistorial));
      localStorage.setItem(CLAVE, JSON.stringify(nuevosUsuarios));
    } catch {
      setMensaje("No se pudo guardar el respaldo. No se eliminó el usuario.");
      return;
    }

    setHistorial(nuevoHistorial);
    setUsuarios(nuevosUsuarios);

    if (idEditando === usuario.id) limpiarFormulario();

    setMensaje("Usuario eliminado. Puedes restaurarlo desde el historial.");
  }

  function restaurarUsuario(registro: UsuarioEliminado) {
    const usuario = registro.usuario;

    const correoOcupado = usuarios.some(
      (u) => u.correo.toLowerCase() === usuario.correo.toLowerCase()
    );

    if (correoOcupado) {
      setMensaje("No se puede restaurar: el correo ya está registrado.");
      return;
    }

    if (!formatoCorreo.test(usuario.correo)) {
      setMensaje("No se puede restaurar: el correo no cumple la validación.");
      return;
    }

    if (!window.confirm(`¿Restaurar a "${usuario.nombre}"?`)) return;

    const idOcupado = usuarios.some((u) => u.id === usuario.id);

    const restaurado: Usuario = {
      ...usuario,
      id: idOcupado
        ? Math.max(0, ...usuarios.map((u) => u.id)) + 1
        : usuario.id
    };

    const nuevosUsuarios = [...usuarios, restaurado];
    const nuevoHistorial = historial.filter(
      (item) => item.idHistorial !== registro.idHistorial
    );

    try {
      localStorage.setItem(CLAVE, JSON.stringify(nuevosUsuarios));
      localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(nuevoHistorial));
    } catch {
      setMensaje("No se pudo completar la restauración.");
      return;
    }

    setUsuarios(nuevosUsuarios);
    setHistorial(nuevoHistorial);
    setMensaje("Usuario restaurado correctamente.");
  }

  const cantidadAdmins = usuarios.filter((u) => u.rol === "Admin").length;

  return (
    <div className="container my-5">

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1>Administrar usuarios</h1>
          <p className="text-muted">
            Gestiona administradores y clientes de Veterinaria San Marcos.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
          >
            Historial ({historial.length})
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={abrirCrear}
          >
            + Agregar usuario
          </button>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-info" role="status">
          {mensaje}
        </div>
      )}

      {mostrarFormulario && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h5 mb-3">
              {idEditando !== null ? "Editar usuario" : "Agregar nuevo usuario"}
            </h2>

            <form onSubmit={guardarUsuario}>
              <div className="row g-3">

                <div className="col-12 col-md-6">
                  <label htmlFor="nombreUsuario" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    id="nombreUsuario"
                    className="form-control"
                    value={nombre}
                    maxLength={100}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="correoUsuario" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    id="correoUsuario"
                    type="email"
                    className="form-control"
                    value={correo}
                    maxLength={150}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="rolUsuario" className="form-label">
                    Rol del usuario
                  </label>
                  <select
                    id="rolUsuario"
                    className="form-select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value as Rol)}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Admin">Administrador</option>
                  </select>
                </div>

                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {idEditando !== null ? "Guardar cambios" : "Crear usuario"}
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
          <h2 className="h5">
            Usuarios registrados ({usuarios.length})
          </h2>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>
                      <span className={
                        usuario.rol === "Admin"
                          ? "badge bg-primary"
                          : "badge bg-secondary"
                      }>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => editarUsuario(usuario)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarUsuario(usuario)}
                          disabled={
                            usuario.rol === "Admin" && cantidadAdmins <= 1
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuarios.length === 0 && <p>No hay usuarios registrados.</p>}
          </div>
        </div>
      </div>

      {mostrarHistorial && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5">Historial de usuarios eliminados</h2>
            <p className="text-muted">
              Recupera usuarios eliminados accidentalmente.
            </p>

            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Fecha de eliminación</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {historial.map((registro) => (
                    <tr key={registro.idHistorial}>
                      <td>{registro.usuario.nombre}</td>
                      <td>{registro.usuario.correo}</td>
                      <td>{registro.usuario.rol}</td>
                      <td>
                        {new Date(registro.fechaEliminacion).toLocaleString("es-CL")}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => restaurarUsuario(registro)}
                        >
                          Restaurar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {historial.length === 0 && (
                <p>No hay usuarios eliminados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsuarios;
