import { Link } from "react-router-dom"

interface BotonProps {
  id: number
}

function Boton({ id }: BotonProps) {
  return (
    <Link
      to={`/catalogo/${id}`}
      className="btn text-white fw-semibold w-100"
      style={{ backgroundColor: "#2D3161" }}
    >
      Ver servicio
    </Link>
  )
}

export default Boton