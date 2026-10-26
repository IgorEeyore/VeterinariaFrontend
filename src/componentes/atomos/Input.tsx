interface InputProps {
  tipo: string
  nombre: string
  valor: string
  placeholder?: string
  alCambiar: (valor: string) => void
}

function Input({ tipo, nombre, valor, placeholder, alCambiar }: InputProps) {
  return (
    <input
      type={tipo}
      name={nombre}
      className="form-control"
      value={valor}
      placeholder={placeholder}
      onChange={(e) => alCambiar(e.target.value)}
    />
  )
}

export default Input
