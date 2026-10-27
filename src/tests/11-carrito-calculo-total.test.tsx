
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResumenCompra from "../componentes/moleculas/ResumenCompra";

test("Prueba 11: mostrar total del carrito", () => {
  const precios = [15000, 20000];
  const total = precios.reduce((suma, precio) => suma + precio, 0);

  render(
    <MemoryRouter>
      <ResumenCompra
        cantidad={precios.length}
        total={total}
        onPagar={() => {}}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("2")).toBeDefined();
  expect(screen.getByText("$35.000")).toBeDefined();
});
