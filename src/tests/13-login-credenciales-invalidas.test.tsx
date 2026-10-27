
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

describe("Prueba 13: Validacion de Login", () => {
  beforeEach(() => {
    localStorage.clear()
    cleanup()
  })

  const iniciarSesion = (correo: string, contrasena: string) => {
    render(
      <MemoryRouter>
        <FormularioLogin />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText("ejemplo@demo.cl"), {
      target: { value: correo }
    })

    fireEvent.change(
      screen.getByPlaceholderText("Ingresa tu contrasena (entre 4 y 10 caracteres)"),
      { target: { value: contrasena } }
    )

    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
  }

  it("rechaza una contrasena incorrecta", () => {
    iniciarSesion("user@demo.cl", "incorrecta");

    expect(screen.getByRole("alert").textContent).toContain(
      "Correo o contrasena incorrectos"
    )
    expect(localStorage.getItem("usuarioActivo")).toBeNull();
  })

  it("rechaza un Gmail no registrado", () => {
    iniciarSesion("noexiste@gmail.com", "clave123");

    expect(screen.getByRole("alert").textContent).toContain(
      "Correo o contrasena incorrectos"
    )
    expect(localStorage.getItem("usuarioActivo")).toBeNull();
  })

  it("permite ingresar con credenciales demo correctas", () => {
    iniciarSesion("user@demo.cl", "5678");

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo") || "null");

    expect(usuario?.correo).toBe("user@demo.cl");
    expect(usuario?.rol).toBe("Cliente");
  })
})
