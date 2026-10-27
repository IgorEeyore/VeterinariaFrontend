
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FormularioAgendar from "../componentes/organismos/FormularioAgendar"

describe("Prueba 14: Formulario Agendar Cita - Flujo Completo", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it("permite completar el formulario y confirmar la reserva de atencion", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {})

    render(
      <MemoryRouter>
        <FormularioAgendar />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText("Ej: Carolina Munoz"), {
      target: { value: "Maria Gonzalez" }
    })
    fireEvent.change(screen.getByPlaceholderText("Ej: +56 9 1234 5678"), {
      target: { value: "+56911223344" }
    })
    fireEvent.change(screen.getByPlaceholderText("Ej: Rocky"), {
      target: { value: "Boby" }
    })

    const selectEspecie = screen.getAllByRole("combobox")[0]
    fireEvent.change(selectEspecie, { target: { value: "Perro" } })

    const inputFecha = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(inputFecha, { target: { value: "2026-11-20" } })

    const inputHora = document.querySelector('input[type="time"]') as HTMLInputElement
    fireEvent.change(inputHora, { target: { value: "11:00" } })

    fireEvent.click(screen.getByRole("button", { name: "Confirmar y Agendar Cita" }))

    expect(alerta).toHaveBeenCalledWith(
      "Cita agendada con exito para Boby el dia 2026-11-20 a las 11:00. Te esperamos en Veterinaria San Marcos."
    )
  })
})
