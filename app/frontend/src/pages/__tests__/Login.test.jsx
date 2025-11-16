import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { vi, afterEach } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

//TEST INICIALIZACION

test("Inicialización de Login", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /iniciar sesión/i })
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText(/correo electrónico/i)
  ).toBeInTheDocument();

  expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /entrar/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /olvidaste tu contraseña/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /no tienes una cuenta/i })
  ).toBeInTheDocument();

});

// TEST ALERTA CAMPOS VACIOS

test("muestra alerta si los campos están vacíos", () => {
  // Mock del alert
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // No completamos campos //

  const BotonEntrar = screen.getByRole("button", { name: /entrar/i });

  fireEvent.click(BotonEntrar);

  expect(alertMock).toHaveBeenCalledWith("Completa todos los campos.");

});

//TEST EMAIL O CONTRASENIA INCORRECTOS

test("muestra alerta si email o contrasenia son incorrectos", async () => {
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          error: "Usuario o contraseña incorrectos",
        }),
    })
    .mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          error: "Usuario o contraseña incorrectos",
        }),
    });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
    target: { value: "juanceto01@mail.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
    target: { value: "incorrecta" },
  });

  //apretamos entrar
  const BotonEntrar = screen.getByRole("button", { name: /entrar/i });
  fireEvent.click(BotonEntrar);

  await Promise.resolve();
  await Promise.resolve(); 

  expect(alertMock).toHaveBeenCalledWith(
    "Usuario o contraseña incorrectos"

  );
});

//TEST LINKS

test("los links de navegación están configurados correctamente", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // olvidaste tu contraseña?
  
  const forgotLink = screen.getByRole("link", {
    name: /olvidaste tu contraseña/i,
  });

  expect(forgotLink).toBeInTheDocument();
  expect(forgotLink.getAttribute("href")).toBe("/forgot-password");

  // no tienes una cuenta?

  const registerLink = screen.getByRole("link", {
    name: /no tienes una cuenta/i,
  });

  expect(registerLink).toBeInTheDocument();
  expect(registerLink.getAttribute("href")).toBe("/register");
});

