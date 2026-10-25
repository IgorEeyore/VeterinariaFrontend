import { useParams, Link } from "react-router-dom"

export const listaServicios = [
  {
    id: 1,
    nombre: "Consulta General",
    precio: 15000,
    categoria: "Servicio",
    imagen: "/img/consulta1.jpg",
    descripcionCorta: "Revision fisica completa para tu mascota.",
    descripcionLarga: "La consulta general incluye una revision exhaustiva de los signos vitales, peso, temperatura, revision dental, ocular y de oidos."
  },
  {
    id: 2,
    nombre: "Vacunacion Anual",
    precio: 25000,
    categoria: "Servicio",
    imagen: "/img/vacuna2.jpg",
    descripcionCorta: "Esquema de vacunacion preventiva.",
    descripcionLarga: "Protege a tu mascota contra las enfermedades mas comunes y peligrosas. Incluye la vacuna Octuple o Triple Felina."
  },
  {
    id: 3,
    nombre: "Peluqueria Canina/Felina",
    precio: 18000,
    categoria: "Servicio",
    imagen: "/img/peinado.jpg",
    descripcionCorta: "Baño, corte de pelo y uñas.",
    descripcionLarga: "Servicio estetico completo. Incluye baño con shampoo hipoalergenico, limpieza de glandulas anales y corte."
  },
  {
    id: 4,
    nombre: "Desparasitacion Interna/Externa",
    precio: 12000,
    categoria: "Medicamento",
    imagen: "/img/vacuna.jpg",
    descripcionCorta: "Tratamiento contra parasitos y pulgas.",
    descripcionLarga: "Control integral de parasitos gastrointestinales y ectoparasitos como pulgas y garrapatas con farmacos certificados."
  },
  {
    id: 5,
    nombre: "Cirugia Menor",
    precio: 45000,
    categoria: "Servicio",
    imagen: "/img/consulta.jpg",
    descripcionCorta: "Intervenciones quirurgicas programadas.",
    descripcionLarga: "Procedimientos como esterilizacion, castracion o suturas menores con anestesia monitoreada y cuidados postoperatorios."
  },
  {
    id: 6,
    nombre: "Corte de Uñas y Limpieza",
    precio: 8000,
    categoria: "Servicio",
    imagen: "/img/uñas.jpg",
    descripcionCorta: "Cuidado podologico y de almohadillas.",
    descripcionLarga: "Corte seguro de uñas para evitar sobrecrecimiento y sangrado, junto con hidratacion de almohadillas plantares."
  }
]

function DetalleServicio() {
  const { id } = useParams()
  const servicio = listaServicios.find((s) => s.id === Number(id))

  const agregarAlCarrito = () => {
    if (!servicio) return
    const carritoActual = JSON.parse(localStorage.getItem("carritoSanMarcos") || "[]")
    carritoActual.push(servicio)
    localStorage.setItem("carritoSanMarcos", JSON.stringify(carritoActual))
    alert(`${servicio.nombre} se agrego al carrito.`)
  }

  if (!servicio) {
    return (
      <div className="container py-5 text-center">
        <h2>Servicio no encontrado</h2>
        <p className="text-muted">El servicio con ID {id} no existe en nuestro catalogo.</p>
        <Link to="/catalogo" className="btn btn-secondary mt-3">
          Volver al Catalogo
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 text-center">
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              className="img-fluid rounded-4 shadow-sm w-100"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-6">
            <span className="badge text-white mb-2" style={{ backgroundColor: "#2ec4b6" }}>
              {servicio.categoria}
            </span>
            <h1 className="fw-bold mb-2" style={{ color: "#2D3161" }}>
              {servicio.nombre}
            </h1>
            <p className="fs-3 fw-bold text-success mb-3">
              ${servicio.precio.toLocaleString("es-CL")}
            </p>
            <p className="lead text-muted mb-3">{servicio.descripcionCorta}</p>
            <p className="mb-4">{servicio.descripcionLarga}</p>
            <div className="d-flex gap-3 flex-wrap">
              <button
                type="button"
                className="btn text-white fw-bold px-4 py-2"
                style={{ backgroundColor: "#2ec4b6" }}
                onClick={agregarAlCarrito}
              >
                🛒 Agregar al Carrito
              </button>
              <Link to="/catalogo" className="btn btn-outline-secondary fw-semibold px-4 py-2">
                ← Volver al Catalogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleServicio