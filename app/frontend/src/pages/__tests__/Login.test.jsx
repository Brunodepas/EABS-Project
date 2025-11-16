import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

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

