import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import GestionUsuarios from "../componentes/organismos/GestionUsuarios"

describe("Prueba 8: CRUD Usuarios - Seguridad Admin", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("verifica que el boton eliminar del rol Admin este deshabilitado", () => {
    render(<GestionUsuarios />)

    const filas = screen.getAllByRole("row")
    const filaAdmin = filas.find((f) => f.textContent?.includes("Admin"))
    expect(filaAdmin).toBeDefined()

    const botonEliminarAdmin = filaAdmin?.querySelector(".btn-outline-danger") as HTMLButtonElement
    expect(botonEliminarAdmin.disabled).toBe(true)
  })
})