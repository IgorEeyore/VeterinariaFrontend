import { Link } from "react-router-dom"

function Inicio() {
  const serviciosDestacados = [
    {
      titulo: "Consulta General",
      descripcion: "Revision medica completa para prevenir y detectar cualquier problema de salud a tiempo.",
      precio: "$15.000",
      imagen: "/img/consulta.jpg"
    },
    {
      titulo: "Vacunacion y Desparasitacion",
      descripcion: "Protege a tu companero con esquemas de vacunacion certificados y control antiparasitario al dia.",
      precio: "Desde $12.000",
      imagen: "/img/vacuna.jpg"
    },
    {
      titulo: "Peluqueria y Bano",
      descripcion: "Bano estetico, corte de pelo, limpieza de oidos y corte de unas con el maximo cuidado.",
      precio: "Desde $18.000",
      imagen: "/img/peluqueria.jpg"
    }
  ]

  const caracteristicas = [
    {
      icono: "🩺",
      titulo: "Veterinarios Certificados",
      detalle: "Equipo multidisciplinario con vocacion y constante actualizacion medica."
    },
    {
      icono: "🏥",
      titulo: "Instalaciones Equipadas",
      detalle: "Boxes clinicos, pabellon quirurgico y farmacia integrada para tu comodidad."
    },
    {
      icono: "⏰",
      titulo: "Urgencias 24/7",
      detalle: "Disponibilidad permanente para atender emergencias veterinarias en cualquier momento."
    },
    {
      icono: "🐾",
      titulo: "Atencion Personalizada",
      detalle: "Cada mascota recibe un trato unico, respetuoso y lleno de carino."
    }
  ]

  const testimonios = [
    {
      nombre: "Andrea Silva",
      texto: "Salvaron a mi perrito Max cuando se enfermo a media noche. La atencion de urgencias fue rapida y los doctores muy empaticos. Recomendados al 100%.",
      estrellas: "★★★★★"
    },
    {
      nombre: "Carlos Mendoza",
      texto: "El servicio de peluqueria es excelente. Mi gata suele ser muy nerviosa, pero la trataron con tanto amor y paciencia que salio ronroneando.",
      estrellas: "★★★★★"
    },
    {
      nombre: "Valeria Rojas",
      texto: "Tienen precios justos, instalaciones muy comodas y una atencion al cliente de primer nivel. Es mi clinica de confianza hace anos.",
      estrellas: "★★★★★"
    }
  ]

  return (
    <div>
      <section className="container py-5 mt-2">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold mb-3" style={{ color: "#2D3161" }}>
              Cuidamos a tu mejor amigo como si fuera nuestro
            </h1>
            <p className="lead mb-4 text-muted">
              En Veterinaria San Marcos ofrecemos atencion medica integral, peluqueria y urgencias 24/7 para perros, gatos y animales exoticos. Mas de 10 anos de experiencia brindando salud y bienestar.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
              <Link
                to="/catalogo"
                className="btn text-white fw-bold px-4 py-2"
                style={{ backgroundColor: "#2ec4b6" }}
              >
                Ver Catalogo
              </Link>
              <Link
                to="/contacto"
                className="btn btn-outline-secondary fw-bold px-4 py-2"
              >
                Contactanos
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="/img/presentacion.jpg"
              className="img-fluid rounded-4 shadow"
              alt="Bienvenida Veterinaria San Marcos"
              style={{ maxHeight: "380px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ color: "#2D3161" }}>
            Nuestros Servicios Destacados
          </h2>
          <p className="text-muted">
            Atencion medica y estetica especializada con los mas altos estandares de calidad
          </p>
        </div>

        <div className="row g-4">
          {serviciosDestacados.map((item) => (
            <div key={item.titulo} className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img
                  src={item.imagen}
                  className="card-img-top"
                  alt={item.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold" style={{ color: "#2D3161" }}>
                    {item.titulo}
                  </h5>
                  <p className="card-text text-muted mb-4 small flex-grow-1">
                    {item.descripcion}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-success fs-5">
                      {item.precio}
                    </span>
                    <Link
                      to="/catalogo"
                      className="btn btn-sm text-white fw-semibold px-3"
                      style={{ backgroundColor: "#2D3161" }}
                    >
                      Ver en Catalogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: "#2D3161" }}>
              Por que confiar en Nosotros
            </h2>
            <p className="text-muted">
              Compromiso profesional y tecnologia al servicio del cuidado animal
            </p>
          </div>

          <div className="row g-4">
            {caracteristicas.map((caract) => (
              <div key={caract.titulo} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 rounded-4 p-3 text-center bg-white">
                  <div className="card-body">
                    <div className="display-5 mb-3">{caract.icono}</div>
                    <h5 className="fw-bold mb-2" style={{ color: "#2D3161" }}>
                      {caract.titulo}
                    </h5>
                    <p className="text-muted small mb-0">
                      {caract.detalle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 text-white" style={{ backgroundColor: "#2D3161" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white mb-2">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-white-50">
              La opinion de quienes confian dia a dia la salud de sus mascotas con nosotros
            </p>
          </div>

          <div className="row g-4">
            {testimonios.map((testimonio) => (
              <div key={testimonio.nombre} className="col-12 col-md-4">
                <div className="card h-100 shadow border-0 rounded-4 p-4 bg-white text-dark">
                  <div className="text-warning mb-2 fs-5">
                    {testimonio.estrellas}
                  </div>
                  <p className="fst-italic text-muted mb-4 small flex-grow-1">
                    "{testimonio.texto}"
                  </p>
                  <h6 className="fw-bold mb-0" style={{ color: "#2D3161" }}>
                    - {testimonio.nombre}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5 text-center">
        <div className="card shadow-sm border-0 rounded-4 p-5" style={{ backgroundColor: "#eef9f8" }}>
          <h2 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
            Urgencias Veterinarias 24/7
          </h2>
          <p className="text-muted mb-4 col-12 col-md-8 mx-auto">
            Atencion de emergencias las 24 horas, todos los dias del ano. Nuestro equipo de turno esta listo para cuidar a tu mascota cuando mas lo necesita.
          </p>
          <div>
            <a
              className="btn text-white fw-bold px-4 py-2"
              style={{ backgroundColor: "#2ec4b6" }}
            >
              📞 Llamar al +56 9 3672 6204
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Inicio