import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import CardServicio from "../componentes/moleculas/CardServicio"

describe("Prueba 2: Molecula CardServicio - Condicional", () => {
  it("renderiza el texto Sin imagen cuando no posee fotografia", () => {
    render(
      <MemoryRouter>
        <CardServicio
          id={99}
          nombre="Servicio Sin Foto"
          categoria="Servicio"
          precio={10000}
          descripcionCorta="Breve descripcion de prueba"
        />
      </MemoryRouter>
    )

    expect(screen.getByText("Sin imagen")).toBeDefined()
    expect(screen.getByText("Servicio Sin Foto")).toBeDefined()
  })
})