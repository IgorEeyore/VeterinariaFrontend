import Input from "../atomos/Input"

interface CampoFormularioProps {
  etiqueta: string
  tipo: string
  nombre: string
  valor: string
  placeholder?: string
  obligatorio?: boolean
  alCambiar: (valor: string) => void
}

function CampoFormulario({
  etiqueta,
  tipo,
  nombre,
  valor,
  placeholder,
  obligatorio = false,
  alCambiar
}: CampoFormularioProps) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {etiqueta} {obligatorio && <span className="text-danger">(*)</span>}
      </label>
      <Input
        tipo={tipo}
        nombre={nombre}
        valor={valor}
        placeholder={placeholder}
        alCambiar={alCambiar}
      />
    </div>
  )
}

export default CampoFormulario