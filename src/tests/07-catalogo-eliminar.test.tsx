import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import GestionCatalogo from "../componentes/organismos/GestionCatalogo"

describe("Prueba 7: CRUD Catalogo - Eliminar", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    vi.spyOn(window, "confirm").mockReturnValue(true)
  })

  it("remueve un servicio de la tabla tras confirmar la accion", () => {
    render(<GestionCatalogo />)

    expect(screen.getByText("Cirugia Menor")).toBeDefined()

    const filas = screen.getAllByRole("row")
    const filaCirugia = filas.find((f) => f.textContent?.includes("Cirugia Menor"))
    expect(filaCirugia).toBeDefined()

    const botonEliminar = filaCirugia?.querySelector(".btn-outline-danger") as HTMLButtonElement
    fireEvent.click(botonEliminar)

    expect(screen.queryByText("Cirugia Menor")).toBeNull()
  })
})