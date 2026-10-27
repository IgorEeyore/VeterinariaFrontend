import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import GestionCatalogo from "../componentes/organismos/GestionCatalogo"

describe("Prueba 4: CRUD Catalogo - Leer", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renderiza la lista inicial de servicios en la tabla", () => {
    render(<GestionCatalogo />)

    expect(screen.getByText("Consulta General")).toBeDefined()
    expect(screen.getByText("Vacunacion Anual")).toBeDefined()
    expect(screen.getByText("Peluqueria Canina/Felina")).toBeDefined()
  })
})