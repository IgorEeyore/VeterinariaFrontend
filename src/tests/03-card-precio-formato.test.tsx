import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import CardServicio from "../componentes/moleculas/CardServicio"

describe("Prueba 3: Molecula CardServicio - Propiedades y Formato", () => {
  it("muestra el precio formateado en pesos chilenos y su insignia de categoria", () => {
    render(
      <MemoryRouter>
        <CardServicio
          id={1}
          nombre="Consulta General"
          categoria="Servicio"
          precio={15000}
          descripcionCorta="Revision completa"
          imagen="/img/consulta1.jpg"
        />
      </MemoryRouter>
    )

    expect(screen.getByText("Consulta General")).toBeDefined()
    expect(screen.getByText("Servicio")).toBeDefined()
    expect(screen.getByText("$15.000")).toBeDefined()
  })
})