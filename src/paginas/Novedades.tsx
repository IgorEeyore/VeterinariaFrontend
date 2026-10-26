
import { useState } from "react";
import { Link } from "react-router-dom";

type Categoria =
  | "Todas"
  | "Salud"
  | "Prevención"
  | "Cuidados";

type Novedad = {
  id: number;
  categoria: Exclude<Categoria, "Todas">;
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
};

const novedades: Novedad[] = [
  {
    id: 1,
    categoria: "Prevención",
    titulo: "La importancia de la vacunación",
    descripcion:
      "Las vacunas ayudan a proteger a perros y gatos frente a enfermedades. Consulta el calendario recomendado para tu mascota.",
    imagen: "/img/vacuna.jpg",
    alt: "Atención veterinaria relacionada con vacunación",
  },
  {
    id: 2,
    categoria: "Salud",
    titulo: "Controles veterinarios preventivos",
    descripcion:
      "Una revisión periódica permite conversar sobre alimentación, peso y posibles cambios en la salud de tu mascota.",
    imagen: "/img/consulta.jpg",
    alt: "Consulta veterinaria para una mascota",
  },
  {
    id: 3,
    categoria: "Cuidados",
    titulo: "Higiene y bienestar diario",
    descripcion:
      "El cepillado y la higiene adecuados ayudan al bienestar de perros y gatos. Adapta el cuidado al tipo de pelaje.",
    imagen: "/img/peluqueria.jpg",
    alt: "Servicio de peluquería para mascotas",
  },
  {
    id: 4,
    categoria: "Prevención",
    titulo: "Cuidados frente a parásitos",
    descripcion:
      "Las pulgas y garrapatas pueden afectar la salud animal. Consulta medidas preventivas apropiadas para tu mascota.",
    imagen: "/img/vacuna1.jpg",
    alt: "Atención preventiva de una mascota",
  },
  {
    id: 5,
    categoria: "Salud",
    titulo: "Atención de mascotas mayores",
    descripcion:
      "Con la edad pueden cambiar las necesidades de alimentación y seguimiento médico. Una evaluación ayuda a detectar esas necesidades.",
    imagen: "/img/mayor.jpg",
    alt: "Mascota mayor",
  },
  {
    id: 6,
    categoria: "Cuidados",
    titulo: "Preparar una visita al veterinario",
    descripcion:
      "Lleva los antecedentes de salud disponibles y anota síntomas o cambios de conducta para facilitar la consulta.",
    imagen: "/img/consulta1.jpg",
    alt: "Consulta y atención de una mascota",
  },
];

const categorias: Categoria[] = [
  "Todas",
  "Salud",
  "Prevención",
  "Cuidados",
];

function Novedades() {
  const [filtro, setFiltro] =
    useState<Categoria>("Todas");

  const visibles =
    filtro === "Todas"
      ? novedades
      : novedades.filter(
          (novedad) => novedad.categoria === filtro
        );

  return (
    <div className="container py-5">
      {/* ENCABEZADO */}
      <header className="text-center mb-4">
        <h1
          className="fw-bold mb-3"
          style={{ color: "#2D3161" }}
        >
          Novedades y consejos
        </h1>

        <p className="text-muted mb-0">
          Información útil para el bienestar y cuidado
          de tus mascotas.
        </p>
      </header>

      {/* FILTROS */}
      <div
        className="d-flex flex-wrap justify-content-center gap-2 mb-4"
        role="group"
        aria-label="Filtrar novedades por categoría"
      >
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={`btn fw-semibold ${
              filtro === categoria
                ? "text-white"
                : "btn-outline-secondary"
            }`}
            style={
              filtro === categoria
                ? { backgroundColor: "#2D3161" }
                : undefined
            }
            onClick={() => setFiltro(categoria)}
            aria-pressed={filtro === categoria}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* TARJETAS DE NOVEDADES */}
      <div className="row g-4">
        {visibles.map((novedad) => (
          <div
            key={novedad.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <article className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={novedad.imagen}
                alt={novedad.alt}
                className="card-img-top"
                style={{
                  height: 195,
                  objectFit: "cover",
                }}
                loading="lazy"
              />

              <div className="card-body d-flex flex-column p-4">
                <span
                  className="badge align-self-start mb-3"
                  style={{
                    backgroundColor: "#2D3161",
                  }}
                >
                  {novedad.categoria}
                </span>

                <h2 className="h5 fw-bold">
                  {novedad.titulo}
                </h2>

                <p className="text-muted flex-grow-1">
                  {novedad.descripcion}
                </p>

                <Link
                  to="/contacto"
                  className="btn btn-outline-primary mt-auto"
                >
                  Consultar a la veterinaria
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* SECCIÓN FINAL */}
      <section className="card border-0 shadow-sm rounded-4 mt-5">
        <div className="card-body p-4 text-center">
          <h2
            className="h4 fw-bold"
            style={{ color: "#2D3161" }}
          >
            ¿Necesitas atención para tu mascota?
          </h2>

          <p className="text-muted">
            Puedes consultar por nuestros servicios
            o agendar una cita veterinaria.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link
              to="/contacto"
              className="btn btn-outline-primary"
            >
              Ir a contacto
            </Link>

            <Link
              to="/agendar"
              className="btn text-white"
              style={{ backgroundColor: "#2D3161" }}
            >
              Agendar hora
            </Link>
          </div>
        </div>
      </section>

      <p className="text-center text-muted small mt-4 mb-0">
        Contenido educativo de demostración;
        no constituye una noticia oficial ni reemplaza
        la evaluación veterinaria.
      </p>
    </div>
  );
}

export default Novedades;
