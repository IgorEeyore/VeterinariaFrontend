
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

test("Prueba 12: rechazar RUN invalido", () => {
  render(
    <MemoryRouter>
      <FormularioRegistro />
    </MemoryRouter>
  )

  fireEvent.change(screen.getByPlaceholderText("Ej: Juan Perez"), {
    target: { value: "Pedro Soto" },
  })

  fireEvent.change(screen.getByPlaceholderText("Ej: 123456789"), {
    target: { value: "123456780" },
  })

  fireEvent.change(screen.getByPlaceholderText("correo@ejemplo.cl"), {
    target: { value: "pedro@correo.cl" },
  })

  fireEvent.change(
    screen.getByPlaceholderText("Ingresa entre 4 y 10 caracteres"),
    { target: { value: "123456" } }
  )

  fireEvent.click(screen.getByRole("button", { name: "Registrarme" }));

  expect(screen.getByRole("alert").textContent).toContain(
    "Digito verificador incorrecto"
  )
})
