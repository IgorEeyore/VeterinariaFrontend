
import { Link } from "react-router-dom";

function Nosotros() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Sobre Nosotros</h1>

        <p className="lead">
          Más de 10 años de experiencia en el cuidado animal.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-7">
          <h2>Veterinaria San Marcos</h2>

          <p>
            Somos una veterinaria dedicada a ofrecer
            atención y cuidado integral para perros,
            gatos y animales exóticos.
          </p>

          <p>
            Nuestros servicios incluyen consultas veterinarias,
            cirugías, vacunación, desparasitación y peluquería.
          </p>

          <p>
            También ofrecemos atención de urgencias
            las 24 horas del día, todos los días.
          </p>

          <Link to="/contacto" className="btn btn-primary">
            Contactar a la veterinaria
          </Link>
        </div>

        <div className="col-12 col-lg-5">
          <div
            className="rounded p-5 text-center"
            style={{ backgroundColor: "#DCEAE7" }}
          >
            <div style={{ fontSize: "4rem" }}>🐾</div>
            <h3>Más de 10 años</h3>
            <p className="mb-0">
              Cuidando a tus mascotas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
