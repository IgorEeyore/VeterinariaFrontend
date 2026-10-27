
import { test, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListadoCatalogo from "../componentes/organismos/ListadoCatalogo";

beforeEach(() => {
  localStorage.clear();
});

test("Prueba 10: filtrar por categoria", () => {
  render(
    <MemoryRouter>
      <ListadoCatalogo />
    </MemoryRouter>
  );

  const categoria = screen.getByRole("combobox");

  fireEvent.change(categoria, {
    target: { value: "Medicamento" },
  });

  expect(
    screen.getByText("Desparasitacion Interna/Externa")
  ).toBeDefined();

  expect(
    screen.queryByText("Consulta General")
  ).toBeNull();
})
