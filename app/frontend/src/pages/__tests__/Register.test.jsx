import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

test("Inicializacion de Register", () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /crear cuenta/i })).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/apellido/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirmar contraseña")).toBeInTheDocument();

  // chequea botones
  expect(
    screen.getByRole("button", { name: /registrarme/i })
  ).toBeInTheDocument();

  // chequea link a iniciar sesion
  expect(
    screen.getByRole("link", { name: /iniciar sesión/i })
  ).toBeInTheDocument();

  // chequea imagenes
  const profilePics = screen.getAllByRole("img");
  expect(profilePics.length).toBeGreaterThanOrEqual(5);


});
