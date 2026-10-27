
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FormularioContacto from "../componentes/organismos/FormularioContacto"

describe("Prueba 15: Formulario Contacto - Persistencia LocalStorage", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it("almacena el mensaje enviado en localStorage bajo la clave mensajesContactoSanMarcos", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {})

    render(<FormularioContacto />)

    fireEvent.change(screen.getByPlaceholderText("Ej: Carolina Munoz"), {
      target: { value: "Carlos Soto" }
    })
    fireEvent.change(screen.getByPlaceholderText("correo@ejemplo.cl"), {
      target: { value: "carlos@ejemplo.com" }
    })
    fireEvent.change(screen.getByPlaceholderText("+56 9 1234 5678"), {
      target: { value: "+56987654321" }
    })
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Consulta General" }
    })
    fireEvent.change(screen.getByPlaceholderText("Escribe tu consulta o requerimiento aqui..."), {
      target: { value: "Atienden feriados?" }
    })

    fireEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }))

    const guardado = localStorage.getItem("mensajesContactoSanMarcos")
    expect(guardado).not.toBeNull()
    const mensajes = JSON.parse(guardado || "[]")
    expect(mensajes).toHaveLength(1)
    expect(mensajes[0].nombre).toBe("Carlos Soto")
  })
})
