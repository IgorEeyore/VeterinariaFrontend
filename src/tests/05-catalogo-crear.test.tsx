import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import GestionCatalogo from "../componentes/organismos/GestionCatalogo"

describe("Prueba 5: CRUD Catalogo - Crear", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    vi.spyOn(window, "alert").mockImplementation(() => {})
  })

  it("permite agregar un nuevo item y reflejarlo en la tabla", () => {
    render(<GestionCatalogo />)

    const botonNuevo = screen.getByText("+ Nuevo Item")
    fireEvent.click(botonNuevo)

    const inputNombre = screen.getByPlaceholderText("Ej: Vacunacion felina")
    const inputPrecio = screen.getByPlaceholderText("Ej: 15000")

    fireEvent.change(inputNombre, { target: { value: "Ecografia de Control" } })
    fireEvent.change(inputPrecio, { target: { value: "32000" } })

    const botonGuardar = screen.getByText("Guardar")
    fireEvent.click(botonGuardar)

    expect(screen.getByText("Ecografia de Control")).toBeDefined()
    expect(screen.getByText("$32.000")).toBeDefined()
  })
})