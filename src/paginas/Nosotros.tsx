import { Link } from "react-router-dom"

function Nosotros() {
  const valores = [
    {
      icono: "💙",
      titulo: "Vocacion y Empatia",
      descripcion: "Tratamos a cada paciente como a un miembro mas de la familia con respeto y carino."
    },
    {
      icono: "🔬",
      titulo: "Tecnologia y Precision",
      descripcion: "Equipamiento moderno para diagnosticos certeros y procedimientos quirurgicos seguros."
    },
    {
      icono: "🛡️",
      titulo: "Etica y Transparencia",
      descripcion: "Claridad absoluta en tratamientos, presupuestos y opciones medicas para tu tranquilidad."
    },
    {
      icono: "⏰",
      titulo: "Disponibilidad 24/7",
      descripcion: "Guardia veterinaria activa todos los dias del ano para responder en emergencias."
    }
  ]

  const equipo = [
    {
      nombre: "Dra. Marcela Contreras",
      cargo: "Directora Medica y Cirugia",
      detalle: "Mas de 12 anos de trayectoria liderando pabellon quirurgico y medicina preventiva canina.",
      icono: "👩‍⚕️"
    },
    {
      nombre: "Dr. Felipe Morales",
      cargo: "Especialista en Urgencias",
      detalle: "Experto en cuidados criticos y atencion intensiva 24 horas para perros, gatos y exoticos.",
      icono: "👨‍⚕️"
    },
    {
      nombre: "Daniela Fuentes",
      cargo: "Peluqueria y Estetica Clinica",
      detalle: "Certificada en cosmetologia animal, manejo libre de estres y bano dermatologico.",
      icono: "✂️"
    }
  ]

  const estadisticas = [
    { cifra: "+10", etiqueta: "Anos de experiencia" },
    { cifra: "+15.000", etiqueta: "Mascotas atendidas" },
    { cifra: "24/7", etiqueta: "Urgencias activas" },
    { cifra: "100%", etiqueta: "Vocacion por la salud" }
  ]

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3" style={{ color: "#2D3161" }}>
          Sobre Nosotros
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "720px" }}>
          En Veterinaria San Marcos dedicamos nuestra labor diaria a cuidar, proteger y sanar a las mascotas que alegran tu vida.
        </p>
      </header>

      <section className="row g-4 align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <div className="pe-lg-4">
            <span className="badge text-white px-3 py-2 mb-3" style={{ backgroundColor: "#2ec4b6" }}>
              Nuestra Historia
            </span>
            <h2 className="fw-bold mb-3" style={{ color: "#2D3161" }}>
              Mas de una decada entregando atencion de excelencia
            </h2>
            <p className="text-secondary mb-3">
              Fundada en Av. Los Zapadores 904, Veterinaria San Marcos nacio con el proposito de brindar una atencion medica integral y accesible. Comenzamos como una pequena consulta barrial y hoy somos un centro veterinario de referencia en la comuna.
            </p>
            <p className="text-secondary mb-4">
              Contamos con boxes de atencion personalizada, farmacia clinica, peluqueria especializada y servicio de urgencias ininterrumpido. Nuestro mayor orgullo es la confianza que miles de tutores han depositado en nuestras manos a lo largo de estos anos.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/catalogo"
                className="btn text-white fw-bold px-4 py-2"
                style={{ backgroundColor: "#2ec4b6" }}
              >
                Conoce Nuestros Servicios
              </Link>
              <Link
                to="/contacto"
                className="btn btn-outline-secondary fw-semibold px-4 py-2"
              >
                Donde Encontrarnos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <img
              src="/img/us.jpg"
              alt="Instalaciones Veterinaria San Marcos"
              className="img-fluid rounded-4 shadow w-100"
              style={{ maxHeight: "390px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="row g-4 mb-5 text-center">
        {estadisticas.map((item, index) => (
          <div key={index} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <div className="display-6 fw-bold text-success mb-1">
                {item.cifra}
              </div>
              <div className="text-muted fw-semibold small">
                {item.etiqueta}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="fs-1">🎯</span>
              <h3 className="fw-bold mb-0" style={{ color: "#2D3161" }}>
                Nuestra Mision
              </h3>
            </div>
            <p className="text-secondary mb-0">
              Proporcionar cuidados medicos preventivos y curativos del mas alto nivel, combinando conocimientos clinicos actualizados con una empatia genuina hacia cada paciente y su familia, promoviendo la tenencia responsable en toda la comunidad.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="fs-1">🌟</span>
              <h3 className="fw-bold mb-0" style={{ color: "#2D3161" }}>
                Nuestra Vision
              </h3>
            </div>
            <p className="text-secondary mb-0">
              Consolidarnos como el centro de salud animal preferido de la zona norte metropolitana, destacando por la calidad de nuestros servicios 24/7, la calidez en la atencion al cliente y un entorno clinico seguro, limpio y tecnologico.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#2D3161" }}>
            Valores que nos Definen
          </h2>
          <p className="text-muted">
            Principios irrenunciables en cada consulta, cirugia y procedimiento
          </p>
        </div>

        <div className="row g-4">
          {valores.map((val, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 bg-white">
                <div className="display-5 mb-3">{val.icono}</div>
                <h5 className="fw-bold mb-2" style={{ color: "#2D3161" }}>
                  {val.titulo}
                </h5>
                <p className="text-secondary small mb-0">
                  {val.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#2D3161" }}>
            Nuestro Equipo Profesional
          </h2>
          <p className="text-muted">
            Especialistas apasionados por la salud y el bienestar de los animales
          </p>
        </div>

        <div className="row g-4">
          {equipo.map((prof, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 bg-white">
                <div className="display-4 mb-3">{prof.icono}</div>
                <h5 className="fw-bold mb-1" style={{ color: "#2D3161" }}>
                  {prof.nombre}
                </h5>
                <div className="badge text-white mb-3" style={{ backgroundColor: "#2ec4b6" }}>
                  {prof.cargo}
                </div>
                <p className="text-secondary small mb-0">
                  {prof.detalle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="card border-0 rounded-4 text-white p-5 text-center shadow"
        style={{ backgroundColor: "#2D3161" }}
      >
        <h2 className="display-6 fw-bold mb-3">
          Tu companero merece la mejor atencion
        </h2>
        <p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          Ven a conocernos a Av. Los Zapadores 904 o reserva tu consulta medica hoy mismo de forma comoda y rapida.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/agendar"
            className="btn text-white fw-bold px-4 py-2 rounded-pill"
            style={{ backgroundColor: "#2ec4b6" }}
          >
            📅 Agendar Hora Medica
          </Link>
          <Link
            to="/contacto"
            className="btn btn-outline-light fw-semibold px-4 py-2 rounded-pill"
          >
            Contactanos
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Nosotros