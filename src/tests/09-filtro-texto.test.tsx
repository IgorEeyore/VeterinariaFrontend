
import { test, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListadoCatalogo from "../componentes/organismos/ListadoCatalogo";

beforeEach(() => {
  localStorage.clear();
});

test("Prueba 09: filtrar servicios por texto", () => {
  render(
    <MemoryRouter>
      <ListadoCatalogo />
    </MemoryRouter>
  );

  const buscador = screen.getByPlaceholderText(
    "Ej: Consulta, Vacuna, Peluqueria..."
  );

  fireEvent.change(buscador, {
    target: { value: "Consulta" },
  });

  expect(screen.getByText("Consulta General")).toBeDefined();

  expect(
    screen.queryByText("Peluqueria Canina/Felina")
  ).toBeNull();
})
