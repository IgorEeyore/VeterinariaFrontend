
import { Link } from "react-router-dom";

function Inicio() {
  const servicios = [
    {
      nombre: "Consultas veterinarias",
      descripcion: "Atención y evaluación de la salud de tus mascotas.",
      icono: "🩺"
    },
    {
      nombre: "Cirugías",
      descripcion: "Servicios quirúrgicos para el cuidado animal.",
      icono: "🏥"
    },
    {
      nombre: "Vacunación",
      descripcion: "Protección preventiva para tus mascotas.",
      icono: "💉"
    },
    {
      nombre: "Desparasitación",
      descripcion: "Prevención y control de parásitos.",
      icono: "🐾"
    },
    {
      nombre: "Peluquería",
      descripcion: "Higiene y cuidado estético de tus mascotas.",
      icono: "✂️"
    }
  ];

  return (
    <>
      <section className="container text-center py-5">
        <h1 className="fw-bold">Veterinaria San Marcos</h1>

        <p className="lead">
          Más de 10 años cuidando la salud y bienestar
          de perros, gatos y animales exóticos.
        </p>

        <p>
          Atención integral con servicios veterinarios
          orientados al cuidado de tus mascotas.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/catalogo" className="btn btn-success">
            Ver catálogo
          </Link>

          <Link to="/contacto" className="btn btn-outline-primary">
            Contáctanos
          </Link>
        </div>
      </section>

      <section className="container pb-5">
        <h2 className="text-center mb-4">
          Nuestros servicios
        </h2>

        <div className="row g-4">
          {servicios.map((servicio) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={servicio.nombre}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">
                    {servicio.icono}
                  </div>

                  <h5 className="card-title">
                    {servicio.nombre}
                  </h5>

                  <p className="card-text">
                    {servicio.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-5 text-center text-white"
        style={{ backgroundColor: "#2D3161" }}
      >
        <div className="container">
          <h2>Urgencias veterinarias 24/7</h2>

          <p>
            Atención de urgencias las 24 horas,
            todos los días de la semana.
          </p>

          <a
            href="tel:+56936726204"
            className="btn btn-light"
          >
            Llamar al +56 9 3672 6204
          </a>
        </div>
      </section>
    </>
  );
}

export default Inicio;
