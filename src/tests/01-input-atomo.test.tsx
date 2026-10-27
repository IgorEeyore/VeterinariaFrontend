import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Input from "../componentes/atomos/Input"

describe("Prueba 1: Atomo Input", () => {
  it("renderiza correctamente con sus propiedades y responde a eventos", () => {
    const alCambiarMock = vi.fn()
    render(
      <Input
        tipo="text"
        nombre="nombreTest"
        valor="Texto inicial"
        placeholder="Escribe aqui"
        alCambiar={alCambiarMock}
      />
    )

    const inputElemento = screen.getByPlaceholderText("Escribe aqui") as HTMLInputElement
    expect(inputElemento).toBeDefined()
    expect(inputElemento.value).toBe("Texto inicial")

    fireEvent.change(inputElemento, { target: { value: "Nuevo texto" } })
    expect(alCambiarMock).toHaveBeenCalledWith("Nuevo texto")
  })
})